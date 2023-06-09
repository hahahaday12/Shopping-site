import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';


const { TextArea } = Input;


const Continents = [
  {key:1, value: "Africa"},
  {key:2, value: "Europe"},
  {key:3, value: "Asia"},
  {key:4, value: "North America"},
  {key:5, value: "South America"},
  {key:6, value: "Australia"},
  {key:7, value: "Antarctica"},
]


function UploadProductPage(props) {

   

  // 서버로 전달될 데이터 부모 컴포넌트에 모두 있음 
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Price, setPrice] = useState(0)
  const [Continent, setContient] = useState(1)
  const [Images, setImages] = useState([])

  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value)
  }

  const descriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value)
  }


  const priceChageHandler = (e) => {
    setPrice(e.currentTarget.value)
  }

  const contienChangeHandler = (e) => {
    setContient(e.currentTarget.value)
  }

  // 파라미터로 이미지 가져오고 set에 저장.
  const updateImages = (newImages) => {
    setImages(newImages)
  }

  const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Continent || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }

         const body = {
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }
 
         Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
    }

  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
        <h2>여행 상품 업로드</h2>
      </div>

      <Form>
        {/* 해당 컴포넌트에 있는 이미지데이터 가져오기 위해 새 함수 생성 */}
        <FileUpload refreshFunction={updateImages}/>
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description}/>
        <br />
        <br />
        <label>가격($)</label>
        <Input type='number' onChange={priceChageHandler} value={Price}/>
        <br />
        <br />
        <select onChange={contienChangeHandler} value={Continent}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}> {item.value} </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={submitHandler}>확인</Button>

      </Form>

    </div>
  )
}

export default UploadProductPage