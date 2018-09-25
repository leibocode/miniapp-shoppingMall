import ejs from 'ejs'

const tpl = `
  {
    "touser":<%= touser%>,
    "msgtype":<%= msgType%>,
    <% if(msgtype=='text') { %>
      "text":{
        "content":<%= content%>
      }
    <%} %>
  }
`

const compiled = ejs.compile(tpl)

export default compiled