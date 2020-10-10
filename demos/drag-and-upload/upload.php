<?php
  move_uploaded_file($_FILES['file']['tmp_name'], 'uploadfiles/'.$_FILES['file']['name']);
?>
