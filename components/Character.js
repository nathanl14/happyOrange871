import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,  } from 'react-native';
import  { useState, useEffect } from 'react';
import { atom, useAtom } from 'jotai';


export const skinatom = atom(0);

export default function Asset() {


 
const [skin,setSkin] = useAtom(skinatom);

if(skin<0){
  setSkin(4)
}

  const skin2  = () =>{


      setSkin(skin+1)
    
  }



  const skin3  = () =>{


      setSkin(skin-1)
    
  }

  if (skin>4){
    setSkin(0)
  }

  if (skin===1){
    return(
       <View style={styles.container}>
      
<TouchableOpacity styles={styles.skin1} onPress={skin2}>
      <Image style={styles.arrow} source={require('../assets/arrow.png')} />
      </TouchableOpacity>

      <TouchableOpacity styles={styles.skin1}>
      <Image style={styles.skinimage} source={require('../assets/skin2.png')} />
      </TouchableOpacity>

      <TouchableOpacity styles={styles.skin1} onPress={skin3}>
      <Image style={styles.arrow2} source={require('../assets/arrow.png')} />
      </TouchableOpacity>



    </View>
    )
  }


  if (skin===2){
    return(
       <View style={styles.container}>
      
<TouchableOpacity styles={styles.skin1} onPress={skin2}>
      <Image style={styles.arrow} source={require('../assets/arrow.png')} />
      </TouchableOpacity>

       <TouchableOpacity styles={styles.skin1}>
      <Image style={styles.skinimage} source={require('../assets/skin3.png')} />
      </TouchableOpacity>

      <TouchableOpacity styles={styles.skin1} onPress={skin3}>
      <Image style={styles.arrow2} source={require('../assets/arrow.png')} />
      </TouchableOpacity>

    </View>
    )
  }

    if (skin===3){
    return(
       <View style={styles.container}>
      
<TouchableOpacity styles={styles.skin1} onPress={skin2}>
      <Image style={styles.arrow} source={require('../assets/arrow.png')} />
      </TouchableOpacity>

       <TouchableOpacity styles={styles.skin1}>
      <Image style={styles.skinimage} source={require('../assets/skin4.png')} />
      </TouchableOpacity>

      <TouchableOpacity styles={styles.skin1} onPress={skin3}>
      <Image style={styles.arrow2} source={require('../assets/arrow.png')} />
      </TouchableOpacity>

    </View>
    )
  }

   if (skin>=4){
    return(
       <View style={styles.container}>
      
       <TouchableOpacity styles={styles.skin1} onPress={skin2}>
      <Image style={styles.arrow} source={require('../assets/arrow.png')} />
      </TouchableOpacity>
      


       <TouchableOpacity styles={styles.skin1}>
      <Image style={styles.skinimage} source={require('../assets/skin5.png')} />
      </TouchableOpacity>


<TouchableOpacity styles={styles.skin1} onPress={skin3}>
      <Image style={styles.arrow2} source={require('../assets/arrow.png')} />
      </TouchableOpacity>
    </View>
    )
  }


  return (
    <View style={styles.container}>

    <TouchableOpacity styles={styles.skin1} onPress={skin2}>
      <Image style={styles.arrow} source={require('../assets/arrow.png')} />
      </TouchableOpacity>
      
      


      <TouchableOpacity styles={styles.skin1}>
      <Image style={styles.skinimage} source={require('../assets/skin1.png')} />
      </TouchableOpacity>

    <TouchableOpacity styles={styles.skin1} onPress={skin3}>
      <Image style={styles.arrow2} source={require('../assets/arrow.png')} />
      </TouchableOpacity>
      
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  arrow: {
   width:50,
   height:50,
   marginLeft:200,
   marginTop:150
  },
  arrow2:{
    width:50,
   height:50,
   marginLeft:-130,
   marginTop:-90,
   transform: [{ rotate: '180deg' }],
  },
  skinimage: {
    marginTop:-88,
    
  },
});
