import '../style/footer.styl'

export default {
  data () {
    return {
      author: 'zx1984'
    }
  },
  render () {
    return (
      <div class='footer-wrapper'>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
