<template>
  <div id="app">    
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>  
<v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="번호" v-model="coffee1Info.coffeeId" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="커피"  v-model="coffee1Info.name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="가격"  v-model="coffee1Info.price" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="특징"  v-model="coffee1Info.feature" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="판매 기간"  v-model="coffee1Info.period" required></v-text-field>
                </v-flex>                
                <v-flex xs12>
                  <v-text-field label="등록일"  v-model="coffee1Info.register_date" required></v-text-field>
                </v-flex> 
              </v-layout>
            </v-container>
          </v-card-text>

  <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnClick($event)">취소</v-btn>
            <v-btn color="blue darken-1" text @click="btnClick($event)">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
	<v-btn color="primary" v-on:click.native="addContact()">추가</v-btn>
	<v-data-table :headers="headers" :items="items" class="elevation-1">
		<template v-slot:item="row">
		<tr>
			<td>{{row.item.coffeeId}}</td>
			<td>{{row.item.name}}</td>
			<td>{{row.item.price}}</td>
			<td>{{row.item.feature}}</td>
      <td>{{row.item.period}}</td>			
			<td>{{row.item.register_date}}</td>
			<td class="text-xs-right">
				<v-btn color="primary" v-on:click.native="updateContact(row.item)">수정</v-btn>
				<v-btn color="primary" v-on:click.native="deleteContact(row.item)">삭제</v-btn>
				<v-btn color="primary" v-on:click.native="sendEvent(row.item)">보기</v-btn>
			</td>
		</tr>
      </template>
	</v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      urlinfo:'http://localhost:8000/coffees1',
      coffee1Info:{
        _id: null,
        coffeeId: null,
        name: null,
        price:null,
        feature:null,
        period:null,
        register_date: null
      },
      dialog: false,
      dialogTitle:null,

      headers: [
        { text: '번호', align: 'left', value: 'coffeeId'},
        { text: '커피', align: 'left', value: 'name'},
        { text: '가격', align: 'left', value: 'price'},
        { text: '특징', align: 'left',value: 'feature'},
        { text: '판매 기간', align: 'left', value: 'period'},
		{ text: '등록일', align: 'left', value: 'register_date'}
      ],
      items:[]
    }
  },
  /*
  created(){
    this.$bus.$on('coffeeSelected',this.refleshData)
/*
    axios.get(this.urlinfo+1) //서버에 요청하기
    .then((res) => {
      console.log(res.data); //성공시
      this.items = res.data;
    })
    .catch((err) => {
      alert('에러 발생: ' + err); //에러 발생
    });
    
  },
  */
 created(){
    axios.get(this.urlinfo) //서버에 요청하기
    .then((res) => {
      console.log(res.data); //성공시
      this.items = res.data;
    })
    .catch((err) => {
      alert('에러 발생: ' + err); //에러 발생
    });
  },
methods:{
    addContact(){
      this.dialog = true;
      this.dialogTitle = "추가";
      this.coffee1Info.register_date = Date.now();
    },
    updateContact(data){
      this.dialog = true;
      this.dialogTitle = "수정";
      this.coffee1Info.coffeeId = data.coffeeId;
      this.coffee1Info.name = data.name;
      this.coffee1Info.price = data.price;
      this.coffee1Info.feature = data.feature;
      this.coffee1Info.period = data.period;      
      this.coffee1Info.register_date = data.register_date;
    },
    deleteContact(data){
      this.dialog = true;
      this.dialogTitle = "삭제";
      this.coffee1Info.coffeeId = data.coffeeId;
      console.log('deleteContact : ' + data);
    },
    sendEvent(data){
      this.$bus.$emit('coffeeSelected',data);
    //  console.log('deleteContact : ' + data);
    },

    btnClick($event){
      this.dialog = false;
      if($event.target.innerHTML == "확인"){
        if(this.dialogTitle =="추가"){ 
          axios.post(this.urlinfo,{ 
            coffeeId: this.coffee1Info.coffeeId, name: this.coffee1Info.name, price:  this.coffee1Info.price,
            feature: this.coffee1Info.feature, period: this.coffee1Info.period, register_date:this.coffee1Info.register_date
          })
          .then(() => {
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              //console.log(res.data); //성공시
              this.items = res.data;
              alert("커피 추가 성공");
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });
            
          })
          .catch((err) => {
            alert('에러 발생: ' + err); //에러 발생
          });          
        }
        else if(this.dialogTitle=="수정"){
          //alert("입력된 정보 : " + "이메일 : " + this.coffee1Info.email + " 패스워드 : " + this.coffee1Info.password);
          axios.put(this.urlinfo + '/'+ this.coffee1Info.coffeeId, { 
            coffeeId: this.coffee1Info.coffeeId, name: this.coffee1Info.name, price:  this.coffee1Info.price,
            feature: this.coffee1Info.feature, period: this.coffee1Info.period, register_date:this.coffee1Info.register_date
          })
          .then(() => {          
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              //console.log(res.data); //성공시
              this.items = res.data;
              alert("업데이트 성공");
            })
            .catch((err) => {
              alert('에러 발생: ' + err); //에러 발생
            });
          })
          .catch((err) => {
            alert('에러 발생: ' + err); //에러 발생
          }); 

        }
        else {
          axios.delete(this.urlinfo + '/'+ this.coffee1Info.coffeeId, { data: { coffeeId: this.coffee1Info.coffeeId } })
          .then((result) => { 
            console.log("삭제 후" + result); //성공시
            axios.get(this.urlinfo) //서버에 요청하기
            .then((res) => {
              this.items = res.data;
              alert("삭제 성공");
            })
            .catch((err) => {
              alert(' 삭제 후 데이터 가져오는 중 에러 발생: ' + err); //에러 발생
            });            
          })
          .catch((err) => { alert('에러 발생: ' + err); });
        }
      }
      this.coffee1Info.coffeeId = null;
      this.coffee1Info.name = null;
      this.coffee1Info.price = null;
      this.coffee1Info.feature = null;
      this.coffee1Info.period = null;      
      this.coffee1Info.register_date = null;
    }

  /*
  methods: {
      refleshData(data) {
        axios.get(this.urlinfo+data.coffeeId) //서버에 요청하기
        .then((res) => {
        console.log(res.data); //성공시
        this.items = res.data;
        })
        .catch((err) => {
        alert('에러 발생: ' + err); //에러 발생
        });          
      }*/
  },
  
}
</script>
<style scoped>
  div{
    margin:0 5px 0 5px;
  }
</style>