import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Head = styled.div`
text-align: center;
`
const ItemClass = styled.div`
margin: 20px;
`

const HeadBar = props => <Head>{props.title}</Head>
const Item = props => (
  <Link to={'/news/' + props.id}>
    <ItemClass>{props.title}</ItemClass>
  </Link>
)

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {listData: []}
    this.getList()
  }
  async getList() {
    let {data} = await axios.get('http://192.168.43.28:3388')
    if (data.status_code === 0) {
      this.setState({
        listData: data.data.objects
      })
    } else {
      alert(data.msg)
    }
  }
  render() {
    return (
      <div>
        <HeadBar title="扇贝阅读" />
        {this.state.listData.map((item, index) =>
          <Item key={index} title={item.title_en} id={item.id} />
        )}
      </div>
    )
  }
}
class News extends Component {
  render() {
    return (
      <div>
        <HeadBar title="新闻详情" />
        Hello
      </div>
    )
  }
}

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/news/:id" component={News}/>
    </div>
  </Router>
), document.getElementById('root'));
