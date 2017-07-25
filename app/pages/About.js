import React from 'react';
import { StyleSheet, Image, Text, Linking, View ,TextInput,TouchableOpacity } from 'react-native';
import store from 'react-native-simple-store';
import {Actions } from 'react-native-router-flux';
import Button from '../components/Button';
import { request,uploadImage } from '../utils/RequestUtil';
import { UPDATE,UPLOAD_AVATAR } from '../constants/Urls';
import { toastShort } from '../utils/ToastUtil';
import ImagePicker from 'react-native-image-crop-picker';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginInfo:{},
            updateNick:false,
            updateSign:false
        };
        this.open=this.open.bind(this)
        store.get('loginInfo').then((loginInfo) => {
            this.setState({loginInfo:loginInfo})
        })
    }
    logout(){
        store.delete("loginInfo");
        Actions.login()
    }
    nick(nick){
        if(!this.state.updateNick){
            return <Text style={styles.text} onPress={()=>{this.setState({updateNick:true})}}>{nick}</Text>
        }else{
            return <TextInput style={{flex:5,borderWidth:1,marginLeft:5,height:35}}
                              underlineColorAndroid='transparent'
                              onChangeText={(text) => {
                                    const loginInfo=  this.state.loginInfo
                                    loginInfo.nick=text;
                                    this.setState({loginInfo:loginInfo})
                              }}
                              onBlur={()=>this.update()}
                              onEndEditing={()=>this.update()}
            />
        }
    }
    sign(sign){
        if(!this.state.updateSign){
            return <Text style={styles.text} onPress={()=>{this.setState({updateSign:true})}}>{sign}</Text>
        }else{
            return <TextInput style={{
                borderWidth:1,
                marginLeft:10,
                marginRight:10,
                height:60}}
                              multiline={true}
                              placeholder={"请输入个人签名"}
                              maxLength={100}
                              underlineColorAndroid='transparent'
                              onChangeText={(text) => {
                                  const loginInfo=  this.state.loginInfo
                                  loginInfo.sign=text;
                                  this.setState({loginInfo:loginInfo})
                              }}
                              onBlur={()=>this.update()}
                              onEndEditing={()=>this.update()}
            />
        }
    }
    update(){
            store.get('loginInfo').then((loginInfo) => {
                if(!this.state.loginInfo.nick||!this.state.loginInfo.sign){
                    toastShort("签名与昵称不可为空")
                    this.setState({loginInfo:loginInfo})
                    this.setState({updateNick:false,updateSign:false})
                }else{
                    request(UPDATE, "post",JSON.stringify(
                        {userName:loginInfo.userName,
                            password:loginInfo.password,
                            nick:this.state.loginInfo.nick,
                            sign:this.state.loginInfo.sign
                        },)).then(function (result) {
                        if(result.resultCode!="0000"){
                            toastShort(result.resultDesc)
                        }else{
                            store.save('loginInfo',this.state.loginInfo)
                            toastShort("更新成功")
                        }
                        this.setState({updateNick:false,updateSign:false})
                    }.bind(this))
                }

            })
    }

    open(){
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true
        }).then(image => {
            uploadImage(UPLOAD_AVATAR,image,this.state.loginInfo.userName).then(function (data) {
                let result = JSON.parse(data);
                if(result.resultCode=="0000"){
                    let loginInfo = this.state.loginInfo;
                    loginInfo.avatar = result.avatar;
                    this.setState({loginInfo:loginInfo});
                    store.save('loginInfo',loginInfo)
                }else{
                    toastShort(result.resultDesc)
                }
            }.bind(this))
        });
    }

  render() {
      const loginInfo = this.state.loginInfo;
      return (
          <View style={styles.container}>
              <View style={styles.rowView}>
                  <TouchableOpacity onPress={()=>this.open()}>
                  <Image style={styles.image} source={{uri: loginInfo.avatar}} />
                  </TouchableOpacity>
                  <View style={styles.textView}>
                      <View style={styles.textView1}>
                      <Text style={styles.text}>账号:</Text>
                      <Text style={styles.text}>{loginInfo.userName}</Text>
                      </View>
                      <View style={styles.textView1} >
                      <Text style={styles.text}>昵称:</Text>
                          {this.nick(loginInfo.nick)}
                      </View>
                  </View>
              </View>
              <View style={styles.rowView1} >
                  <Text style={styles.text2}>个人签名:</Text>
                  {this.sign(loginInfo.sign)}
              </View>
              <View style={styles.rowView2}>
              <Button children="退出登录"
                      onPress={()=>{this.logout()}}
                      style={{marginTop: 30,width:300}}
              />
              </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: "#FFF"
    },
    rowView1: {
        height:100,
        marginTop: 20,
        paddingLeft: 10,
        backgroundColor: "#FFF",
    },
    rowView2: {
        height:50,
        marginTop: 20,
        paddingLeft: 10,
        alignItems:'center',
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height: 60,
        marginTop: 10,
        marginLeft: 5,
        marginBottom:5,
        borderRadius: 8
    },
    textView: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom:5,
        marginRight:5,
        left: 20,
    },
    textView1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18
    },
});

export default About;
