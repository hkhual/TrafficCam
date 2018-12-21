

import React, {Component} from 'react';
import {StyleSheet,
     Text,
     Image,
     FlatList,
      View } from 'react-native';

export default class App extends Component {
    //Json parsing
    state={
      data: []
    };

    componentWillMount(){
      this.fetchData();
    }

    fetchData = async ()=>{
      const response = await 
      fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
    const json = await response.json();
    this.setState({data: json.Features});
  };

  cameraType(camera){
    if(camera.Type == 'sdot'){
      return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
    }else{
          return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;
    }
}

  render() {
    return (
      <View  style={styles.container}>  
        <View>
            

          </View>

       <FlatList
          data={this.state.data}
          // x is the object and i is the index
          keyExtractor={(x, i) => i.toString()}
          renderItem={ ({item}) =>
            //url = cameraType(item.Cameras[0]);
            <View style={{marginBottom: 30, borderColor: '#000', borderRadius: 5, borderWidth: 5}}>
                <Text style={{fontSize: 20, color: 'black'}}>
                    {`${item.Cameras[0].Description}`}
                </Text>
                <Image
                  source = {{ uri: this.cameraType(item.Cameras[0]) }}
                  style = {{height: 250, margin: 3}}
                  />

            </View>
          }
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      
      
  },
 
  textView: {
    width: '60%',
    textAlignVertical: 'center',
      padding: 10,
      color: '#000',
      fontSize: 15,
      color: 'red',
  },

  imageView: {
    width: '60%',
    height: '100%',
    margin: 7,
    borderRadius: 7,
  },

});