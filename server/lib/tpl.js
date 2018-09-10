import ejs from 'ejs'

const tpl = `
  <xml>
    <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
    <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
    <CreateTime><%= createTime %></CreateTime>
    <MsgType><![CDATA[<%= msgType %>]]></MsgType>
    <% if (msgType ==='text') { %>
      <Content><![CDATA[<%- content %>]]></Content>
    <% } else if (msgType === 'image') { %>
      <Image>
      <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
      </Image>
    <% } %>
  </xml>
`

const compiled = ejs.compile(tpl)

export default compiled