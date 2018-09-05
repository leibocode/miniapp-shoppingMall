import Search  from '../../models/searchModel'

const search =new Search()
Pgae({
    data:{
        historyKeys:[],
        hotKeys:[],
        finished:false,
        q:'',
        loading:false,
        loadingCenter:false
    },
    Load:function(){
        this.setData({
            historyKeys:search.gitHistory()
        })

        search.getHot((data)=>{
            this.setData({
                hotKeys:data
            })
        })
    }, 
    onCancel:function(){
        
    },
    ondeleteHis:function(){

    },
    onDelete:function(event){

    }, 
    onConfirm:function(event){
        this.setData({
            finished:true, 
            loadingCenter:true
        })

        let q =event.detail.value || event.detail.text 
        search.search({
            keyword:q,
            size:10,
            page:0
        },(data)=>{
            console.log('')
        })
    }
})