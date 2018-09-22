import Address from '../../models/addressModel'

const commonCityData =require('../../utils/city.js')
const addressModel =new Address()

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
        this.initCityData(1)
        if(id){
            addressModel.getAddressById(id,(data)=>{
                
            })
        }
    },

    bindSave:function(event){
        var that = this;
        var linkMan = event.detail.value.linkMan;
        var address = event.detail.value.address;
        var mobile = event.detail.value.mobile;
        var code = event.detail.value.code;

        if (linkMan == "") {
            wx.showModal({
                title: '提示',
                content: '请填写联系人姓名',
                showCancel: false
            })
            return
        }
        if (mobile == "") {
            wx.showModal({
                title: '提示',
                content: '请填写手机号码',
                showCancel: false
            })
            return
        }
        if (this.data.selProvince == "请选择") {
            wx.showModal({
                title: '提示',
                content: '请选择地区',
                showCancel: false
            })
            return
        }
        if (this.data.selCity == "请选择") {
            wx.showModal({
                title: '提示',
                content: '请选择地区',
                showCancel: false
            })
            return
        }

        let cityId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].id;
        let districtId;
        if (this.data.selDistrict == "请选择" || !this.data.selDistrict) {
          districtId = '';
        } else {
          districtId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[this.data.selDistrictIndex].id;
        }
        if (address == "") {
          wx.showModal({
            title: '提示',
            content: '请填写详细地址',
            showCancel: false
          })
          return
        }
        if (code == "") {
          wx.showModal({
            title: '提示',
            content: '请填写邮编',
            showCancel: false
          })
          return
        }

        addressModel.postaddress({
            provinceId: commonCityData.cityData[this.data.selProvinceIndex].id,
            cityId: cityId,
            districtId: districtId,
            name:linkMan,
            addressText:address,
            mobile: mobile,
            code: code,
        },(data)=>{
            console.log()
            if(data.success){
               wx.navigateBack({})
            }else {
                
            }
            
        })

    },
    bindCancel:function(){
        wx.navigateBack({})
    },
    bindPickerProvinceChange:function(event){
        let selIterm =commonCityData.cityData[event.detail.value];

        this.setData({
            selProvince:selIterm.name,
            selProvinceIndex:event.detail.value,
            selCity:'请选择',
            selCityIndex:0,
            selDistrict:'请选择',
            selDistrictIndex: 0
        })
        this.initCityData(2,selIterm)
    },
    bindPickerCityChange:function(event){
        let selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value]

        this.setData({
            selCity: selIterm.name,
            selCityIndex: event.detail.value,
            selDistrict: '请选择',
            selDistrictIndex: 0
        })
        this.initCityData(3,selIterm)
    },
    bindPickerChange:function(event){
        let selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
        if (selIterm && selIterm.name && event.detail.value) {
        this.setData({
            selDistrict: selIterm.name,
            selDistrictIndex: event.detail.value
        })
        }
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

    initCityData:function(level,obj){
        if(level ==1){
            let pinkArray =[]
            for(let i =0;i<commonCityData.cityData.length;i++){
                pinkArray.push(commonCityData.cityData[i].name)
            }
            this.setData({
                provinces:pinkArray
            })
        }else if(level==2){
            let pinkArray =[]
            let dataArray = obj.cityList
            for(let i=0;i<dataArray.length;i++){
                pinkArray.push(dataArray[i].name)
            }
            this.setData({
                citys:pinkArray
            })
        }else if(level==3){
            let pinkArray =[]
            let dataArray =obj.districtList
            for(let i=0;i<dataArray.length;i++){
                pinkArray.push(dataArray[i].name)
            }

            this.setData({
                districts: pinkArray
            })
        }
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