import Address from '../../models/addressModel'

const commonCityData =require('../../utils/city.js')
const address =new Address()

Page({
    data:{
        provinces:[],
        citys:[],
        districts:[],
        selProvince:'请选择',
        selCity:'请选择',
        selDistrict:'请选择',
        selProvinceIndex:0,
        selCityIndex:0,
        selDistrictIndex:0
    },
    onLoad:function(options){
        const id =options.id
        if(id){

        }else{

        }
    },

    bindSave:function(){

    },

    bindPickerProvinceChange:function(){
        let selItem =commonCityData.cityData[event.detail.value];

        this.setData({
            selProvince:selIterm.name,
            selProvinceIndex:event.detail.value,
            selCity:'请选择',
            selCityIndex:0,
            selDistrict:'请选择',
            selDistrictIndex: 0
        })

    },
    deleteAddress:function(event){
        let that =this
        let id  = address.getDataSet(event,'id')
        wx.showModal({
            title:'提示',
            content:'确认要删除该收货地址吗?',
            success:function(res){
                if(res.confirm){
                    //确定删除，调用后但接口
                }else if(res.cancel){
                    console.log('用户点击取消')
                }
            }
        })
    },

    //从微信种读取地址
    readFromWx:function(event){
        let that = this
        wx.chooseAddress({
            success:function(res){
                
            }
        })
    }
})