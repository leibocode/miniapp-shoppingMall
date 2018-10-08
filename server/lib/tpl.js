import ejs from 'ejs'

const tpl = `
  {
    "touser":<%= toUserName%>,
    "msgtype":<%= msgType%>,
    <% if(msgtype=='text') { %>
      "text":{
         "content":<%= content%>
      }
    <%} else if(msgtype=='miniprogrampage'){ %>
      "miniprogrampage":{ %>
        "title":<%= content.title%>,
        "pagepath":<&= content.page&>,
        "thumb_media_id":<%= content.media_id%>
      }
   <%} else if(msgtype=='link'){ %>
       "link":{
        "title":<%= content.title%>,
        "description":<%= content.description%>,
        "url":<%= content.url%>,
        "thumb_media_id":<%= content.media_id%>
       }
    <% }%>
  }
`

const compiled = ejs.compile(tpl)

export default compiled