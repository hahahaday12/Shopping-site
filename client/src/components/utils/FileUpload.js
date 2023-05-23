import React, { useState } from 'react';
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';


function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

      let formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/fomr-data'}
      }
      formData.append("file", files[0])

      axios.post('/api/product/image', formData, config)
          .then(response => {
              if (response.data.success) {
                  setImages([...Images, response.data.filePath])
                  
                  // 추가 
                  props.refreshFunction([...Images, response.data.filePath])
              } else {
                  alert('파일을 저장하는데 실패했습니다.')
              }
          })

  }

    const deleteHandler = (image) => {
      const currentIndex = Images.indexOf(image)
      // 이미지 배열 복사 
      let newImages = [...Images]
      // 클릭한 index 번호중, 1개
      newImages.splice(currentIndex, 1)
      // 삭제하고 남은 이미지 setImages
      setImages(newImages)
      //추가
      props.refreshFunction(newImages)
    }

    return(
        <div style={{ display: 'flex' , justifyContent: 'space-between'}}>
          <Dropzone onDrop={dropHandler}>
              {({getRootProps, getInputProps}) => (
                <div
                    style={{
                      width: 300, height: 240, border: '1px solid lightgray',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{ fontSize: '3rem'}} />  
                </div>
              )}
          </Dropzone>

          <div style={{ display:'flex', width:'340px', height:'240px', overflowX:'scroll'}}>

              {Images.map((image, index) => (
                <div onClick={() => deleteHandler(image)}key={index}>
                  <img style={{ minWidth:'300px', width: '300px', height:"240px"}} 
                    src={`http://localhost:5005/${image}`}
                  />
                </div>  
              ))}

          </div>
        </div>
    )
};
export default FileUpload;