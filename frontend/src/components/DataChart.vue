<script>
import axios from 'axios'
import { Bar } from "vue-chartjs"

const API_URL = 'http://localhost:8000/coffees/'

export default {
  extends: Bar,
  data(){
    return {
        bardata: {
            labels: [
            "월",
            "화",
            "수",
            "목",
            "금",
            "토",
            "일"
            ],
            datasets: [
            {
                label: "판매 실적",
                backgroundColor: "#f87979",
                data: [39, 10, 40, 39, 80, 40, 20]
            }
            ]
        }
    }
  },
    mounted() {
        console.log(this.bardata)
    },
    created(){
        this.$bus.$on('coffeeSelected',this.refleshData)
    },
    methods: {
      refleshData(data) {
        axios.get(API_URL+data.coffeeId) //서버에 요청하기
        .then((response) => {            
            var data = response.data
            data.forEach((value,index)=>{
                this.linedata.datasets[0].data[index] = value['price']
                console.log(value['price'])
            })
            this.renderChart(this.linedata, {
                responsive: true,maintainAspectRatio: false,
                title: {
                display: true,
                text: "My Data"
                }
            })
        })
        .catch((err) => {
        alert('에러 발생: ' + err); //에러 발생
        });          
      }
  }
};
</script>