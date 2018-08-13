import HomeModel from '../../models/homeModel.js'

var model =new HomeModel()
Page({
    data:{
        loading:true,
        bannerArr:[{
            "img": "http://www.hehe168.com/public/upload/m/201611/10/5823ce9a352bc.jpg"
        }],
        themeArr:[{
            "img": "http://www.hehe168.com/public/upload/photos/000/000/171/27/7266f71926520eca29fc6596dbfcf0c2PTztAT.jpg",
            "title": "《面面驾到》：暖胃暖心的一日三餐",
            "url": "http://www.hehe168.com/note/3g/466731",
            "summary": "面条的主要营养成分有蛋白质、脂肪、碳水化合物等。热腾腾的面条不但能快速填饱肚子，还易于消化吸收、滋养脾胃！偏好不同口感的朋友可以搭配喜欢的佐料，营养又带感^_^ 吃进肚里还能平衡营养吸收、增强免疫力。在如此快节奏的生活中，一碗小面是非常之快捷，又有营养的美食。冬日常做一碗必备的小面，来温暖你的胃！"
        },{
            "img": "http://www.hehe168.com/public/upload/photos/000/000/171/27/7266f71926520eca29fc6596dbfcf0c2PTztAT.jpg",
            "title": "《面面驾到》：暖胃暖心的一日三餐",
            "url": "http://www.hehe168.com/note/3g/466731",
            "summary": "面条的主要营养成分有蛋白质、脂肪、碳水化合物等。热腾腾的面条不但能快速填饱肚子，还易于消化吸收、滋养脾胃！偏好不同口感的朋友可以搭配喜欢的佐料，营养又带感^_^ 吃进肚里还能平衡营养吸收、增强免疫力。在如此快节奏的生活中，一碗小面是非常之快捷，又有营养的美食。冬日常做一碗必备的小面，来温暖你的胃！"
        },{
            "img": "http://www.hehe168.com/public/upload/photos/000/000/171/27/7266f71926520eca29fc6596dbfcf0c2PTztAT.jpg",
            "title": "《面面驾到》：暖胃暖心的一日三餐",
            "url": "http://www.hehe168.com/note/3g/466731",
            "summary": "面条的主要营养成分有蛋白质、脂肪、碳水化合物等。热腾腾的面条不但能快速填饱肚子，还易于消化吸收、滋养脾胃！偏好不同口感的朋友可以搭配喜欢的佐料，营养又带感^_^ 吃进肚里还能平衡营养吸收、增强免疫力。在如此快节奏的生活中，一碗小面是非常之快捷，又有营养的美食。冬日常做一碗必备的小面，来温暖你的胃！"
        }],
        products:[{
                "category": "坚果炒货",
                "cate": "三只松鼠",
                "name": "【年货开抢】三只松鼠年货礼包6袋1208g",
                "price": "￥88.00",
                "img": "http://www.hehe168.com/public/upload/photos/000/000/149/25/78dddbcdc167b0fb2cdcde2f7fff9a2fu7pyeV.jpg",
                "url": "http://www.hehe168.com/m/details/id/400773",
                "summary": "根据权威机构研究得出：每周食用两次以上坚果能够降低人们患致命心脏病的风险，这是美国医生健康研究项目的两万名名男性医生消费坚果的特点进行调查后的准确结果。专家还指出：每周至少吃两次，每次一盎司坚果的人死于突发性心脏病的几率要比根本不吃坚果的人低47%。因为坚果中富含蛋白质，又叫长生果，又叫植物肉，它是大自然给予人类最美好的礼物，它的营养价值被社会所公认，它含有的锌、锰、磷等人类所必须的微量元素对人类来说都是非常宝贵的！还能够调节人体内分泌、对于我们的大脑神经也有很好的调节功能，还能够防癌、抗癌。对人类的帮助"
            },{
                "category": "坚果炒货",
                "cate": "三只松鼠",
                "name": "【年货开抢】三只松鼠年货礼包6袋1208g",
                "price": "￥88.00",
                "img": "http://www.hehe168.com/public/upload/photos/000/000/149/25/78dddbcdc167b0fb2cdcde2f7fff9a2fu7pyeV.jpg",
                "url": "http://www.hehe168.com/m/details/id/400773",
                "summary": "根据权威机构研究得出：每周食用两次以上坚果能够降低人们患致命心脏病的风险，这是美国医生健康研究项目的两万名名男性医生消费坚果的特点进行调查后的准确结果。专家还指出：每周至少吃两次，每次一盎司坚果的人死于突发性心脏病的几率要比根本不吃坚果的人低47%。因为坚果中富含蛋白质，又叫长生果，又叫植物肉，它是大自然给予人类最美好的礼物，它的营养价值被社会所公认，它含有的锌、锰、磷等人类所必须的微量元素对人类来说都是非常宝贵的！还能够调节人体内分泌、对于我们的大脑神经也有很好的调节功能，还能够防癌、抗癌。对人类的帮助"
        }]
    },
    onLoad(){
        this._loadData()
    },
    _loadData:function(callback){
        var that = this
              
    },
    onShareAppMessage(){
        return {
            title:'零食1号',
            path:'pages/home/home'
        }
    }
})
