# Windows 系统转换 DeepSeek-R1 模型到 Ollama 完整指南

huggingface的普通模型转Ollama用的GGUF模型

## 系统要求

- **操作系统**: Windows 10/11
- **显卡**: NVIDIA 4090 (24GB)
- **内存**: 64GB
- **磁盘空间**: 至少 150GB 可用空间
- **Python**: 3.10 或更高版本

## 前置准备

### 1. 安装 Git 和 Git LFS

```powershell
# 下载并安装 Git
# https://git-scm.com/download/win

# 验证安装
git --version

# 安装 Git LFS
git lfs install
```

### 2. 安装 Python 依赖

```powershell
# 创建虚拟环境（可选但推荐）
python -m venv llama-env
.\llama-env\Scripts\Activate.ps1

# 安装必要的包
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers sentencepiece protobuf accelerate gguf
```

### 3. 安装 Ollama

```powershell
# 下载并安装 Ollama for Windows
# https://ollama.com/download

# 验证安装
ollama --version
```

## 方法一：Python 脚本转换（推荐，无需编译）

### 步骤 1: 克隆 llama.cpp 仓库

```powershell
# 克隆仓库（仅需 Python 脚本）
cd D:\  # 选择一个有足够空间的目录
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
```

### 步骤 2: 下载 DeepSeek-R1 模型

```powershell
# 返回上级目录
cd ..

# 克隆模型（约 60-70GB，需要较长时间）
git clone https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B

# 等待下载完成...
```

### 步骤 3: 转换为 GGUF 格式

```powershell
# 进入 llama.cpp 目录
cd llama.cpp

# 转换模型为 FP16 GGUF 格式
python convert_hf_to_gguf.py ..\DeepSeek-R1-Distill-Qwen-32B `
  --outfile deepseek-r1-qwen-32b-f16.gguf `
  --outtype f16

# 如果上述命令不支持，使用通用转换脚本
python convert.py ..\DeepSeek-R1-Distill-Qwen-32B `
  --outfile deepseek-r1-qwen-32b-f16.gguf `
  --outtype f16
```

**预计时间**: 10-20 分钟

### 步骤 4: 量化模型（需要编译工具）

#### 选项 A: 使用预编译版本

```powershell
# 1. 访问 https://github.com/ggerganov/llama.cpp/releases
# 2. 下载最新的 llama-*-bin-win-cuda-cu12.2.0-x64.zip
# 3. 解压到当前目录

# 使用预编译的 llama-quantize.exe
.\llama-quantize.exe deepseek-r1-qwen-32b-f16.gguf `
  deepseek-r1-qwen-32b-q4_k_m.gguf Q4_K_M

# 其他量化选项：
# Q4_K_M: 约 18GB，速度快，推荐
# Q5_K_M: 约 22GB，质量更好
# Q8_0: 约 34GB，接近原始质量
```

#### 选项 B: 使用 CMake 编译（需要 Visual Studio）

```powershell
# 安装 Visual Studio 2022 Community
# https://visualstudio.microsoft.com/downloads/
# 勾选 "使用 C++ 的桌面开发"

# 安装 CMake
# https://cmake.org/download/

# 在 llama.cpp 目录中编译
mkdir build
cd build

# 配置（启用 CUDA 支持）
cmake .. -DLLAMA_CUDA=ON -DCMAKE_BUILD_TYPE=Release

# 编译（需要 10-30 分钟）
cmake --build . --config Release

# 量化模型
cd ..
.\build\bin\Release\llama-quantize.exe deepseek-r1-qwen-32b-f16.gguf `
  deepseek-r1-qwen-32b-q4_k_m.gguf Q4_K_M
```

**预计时间**: 5-10 分钟

## 方法二：直接下载已转换的 GGUF 模型（最快）

```powershell
# 1. 在 Hugging Face 搜索已转换版本
# 访问: https://huggingface.co/models?search=deepseek-r1+gguf

# 2. 找到后使用 git 或浏览器下载
git clone https://huggingface.co/[用户名]/[模型名-GGUF]

# 3. 或者使用 huggingface-cli
pip install huggingface_hub
huggingface-cli download [用户名]/[模型名] --local-dir ./models
```

## 导入到 Ollama

### 步骤 1: 创建 Modelfile

```powershell
# 创建 Modelfile
@"
FROM ./deepseek-r1-qwen-32b-q4_k_m.gguf

TEMPLATE """<|im_start|>system
{{ .System }}<|im_end|>
<|im_start|>user
{{ .Prompt }}<|im_end|>
<|im_start|>assistant
"""

SYSTEM """You are a helpful AI assistant based on DeepSeek-R1."""

PARAMETER stop "<|im_start|>"
PARAMETER stop "<|im_end|>"
PARAMETER temperature 0.7
PARAMETER top_p 0.8
PARAMETER repeat_penalty 1.05
PARAMETER num_gpu 99
"@ | Out-File -Encoding UTF8 Modelfile
```

### 步骤 2: 导入模型

```powershell
# 创建模型（确保在 GGUF 文件所在目录）
ollama create deepseek-r1-qwen-32b -f Modelfile

# 查看已安装的模型
ollama list
```

### 步骤 3: 测试模型

```powershell
# 运行模型
ollama run deepseek-r1-qwen-32b

# 或者测试单个问题
ollama run deepseek-r1-qwen-32b "你好，请介绍一下你自己"
```

## 性能优化建议

### 针对 4090 24GB 显存的推荐配置

| 量化级别 | 模型大小 | 显存占用 | 推理速度 | 质量 | 推荐场景 |
|---------|---------|---------|---------|------|---------|
| Q4_K_M  | ~18GB   | 全显存   | 最快     | 良好  | **日常使用（推荐）** |
| Q5_K_M  | ~22GB   | 全显存   | 快       | 很好  | 质量要求高 |
| Q8_0    | ~34GB   | 显存+内存 | 较慢     | 极好  | 最高质量需求 |

### Modelfile 参数说明

```
PARAMETER num_gpu 99           # 尽可能使用 GPU
PARAMETER num_thread 8         # CPU 线程数
PARAMETER temperature 0.7      # 创造性 (0-2)
PARAMETER top_p 0.8           # 采样范围
PARAMETER repeat_penalty 1.05  # 重复惩罚
PARAMETER num_ctx 4096        # 上下文长度
```

## 常见问题排查

### 问题 1: 转换脚本报错 "unsupported model"

**解决方案**:
```powershell
# 使用通用转换脚本
python convert.py ..\DeepSeek-R1-Distill-Qwen-32B `
  --outfile deepseek-r1-qwen-32b-f16.gguf
```

### 问题 2: 内存不足

**解决方案**:
- 关闭其他占用内存的程序
- 使用更激进的量化 (Q4_K_M 或 Q4_0)
- 增加虚拟内存（页面文件）

### 问题 3: Ollama 无法加载模型

**解决方案**:
```powershell
# 检查 GGUF 文件路径是否正确
# Modelfile 中的路径必须是相对或绝对路径

# 使用绝对路径
FROM D:/llama.cpp/deepseek-r1-qwen-32b-q4_k_m.gguf
```

### 问题 4: 推理速度慢

**解决方案**:
```powershell
# 确保使用了 GPU
ollama run deepseek-r1-qwen-32b --verbose

# 检查 CUDA 是否可用
python -c "import torch; print(torch.cuda.is_available())"

# 在 Modelfile 中确保设置了 num_gpu
PARAMETER num_gpu 99
```

## 时间和空间预估

| 步骤 | 时间 | 磁盘空间 |
|-----|------|---------|
| 下载原始模型 | 30-60分钟 | ~65GB |
| 转换为 GGUF | 10-20分钟 | +65GB |
| 量化 | 5-10分钟 | +18-34GB |
| **总计** | **45-90分钟** | **~150GB** |

## 清理临时文件

```powershell
# 转换完成后可以删除原始模型
Remove-Item -Recurse -Force ..\DeepSeek-R1-Distill-Qwen-32B

# 删除未量化的 FP16 文件
Remove-Item deepseek-r1-qwen-32b-f16.gguf

# 只保留量化后的 GGUF 文件和 Modelfile
```

## 参考资源

- [llama.cpp GitHub](https://github.com/ggerganov/llama.cpp)
- [Ollama 官方文档](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
- [DeepSeek-R1 模型页面](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B)
- [GGUF 格式说明](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md)

## 结语

完成以上步骤后，您就可以在本地使用 DeepSeek-R1-Qwen-32B 模型了。建议从 Q4_K_M 量化版本开始，它在 4090 上可以完全加载到显存，获得最佳性能。

如有问题，可以查看 llama.cpp 和 Ollama 的官方文档或社区支持。