import ejs from 'ejs'

const tpl = `
  {
    "touser":<%= opid%>,
    "msgtype":<%= msgtype%>,
    <% if(msgtype=='text') { %>
      "text":{
        "content":<%= content%>
      }
    <%} %>
  }
`

const compiled = ejs.compile(tpl)

export default compiled