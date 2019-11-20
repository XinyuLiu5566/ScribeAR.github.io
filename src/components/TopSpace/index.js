import React from 'react'
import './index.css'
import Options from './Options'

class TopSpace extends React.Component {
     constructor(props) {
          super(props)
          this.state = {
               shown: true,
               timeoutId: setTimeout(this.hide.bind(this), 15000)
          }
          this.hide = this.hide.bind(this)
          this.show = this.show.bind(this)
          this.resetTimeout = this.resetTimeout.bind(this)
     }
     hide() {
          this.setState({ shown: false })
          document.getElementById('outer').addEventListener('click', this.show)
     }
     show() {
          this.setState({ shown: true })
          document.getElementById('outer').removeEventListener('click', this.show)
          this.resetTimeout()
     }
     resetTimeout() {
          clearTimeout(this.state.timeoutId)
          var toId = setTimeout(this.hide, 15000)
          this.setState({timeoutId: toId})
     }
     componentDidMount() {
          document.getElementById('TheBox1').addEventListener('click', this.show)
     }

     render() {
          var h = '64vh';
          return (
               <div className="TopSpace" id="outer" style={{ height: h }}>
                    <div className={"Container " + (this.state.shown ? "shown" : "hidden")}>
                         <div id="TheBox1">
                              <Options resetTimeout={this.resetTimeout} />
                         </div>
                         <div className="TheBox2" onClick={this.hide}>
                              <div className="TheBox3">Hide</div>
                         </div>
                    </div>
               </div>
          )
     }
}

export default TopSpace;