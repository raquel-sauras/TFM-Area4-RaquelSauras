import {Form, Image} from 'react-bootstrap'
import {PageHeader} from "../Components/Layouts/PageHeader";
import {DefaultLayout} from "../Components/Layouts/DefaultLayout";
import {ChangeEvent, FormEvent, SyntheticEvent, useState} from "react";

interface Result {
  class_name: string;
  image_path: string;
}

const apiHost = 'https://raquel-sauras-tfm.psicoeducacio.com';
//const apiHost = 'http://localhost:8080';

export default function Home() {
  const [image, setImage] = useState<Blob | string>("");
  const [result, setResult] = useState<Result|undefined>(undefined);

  const uploadToClient = (event: SyntheticEvent) => {
    console.log("uploading image");
    const target = event.target;
    // @ts-ignore
    if (target.files && target.files[0]) {
      // @ts-ignore
      const i = target.files[0];

      setImage(i);
    }
  };

  const classifyImage = async (event: ChangeEvent | FormEvent): Promise<void> => {
    event.preventDefault()
    console.log("submit");
    const body = new FormData();
    body.append("file", image);
    const res = await fetch(apiHost + '/api/v1/predict', {
      method: "POST",
      body: body,
    })

    const gotResult = await res.json() as Result

    console.log(gotResult);
    setResult(gotResult)
  }
  return (
      <DefaultLayout
          title='Raquel Sauras Salas TFM'
          mainClassName='container-fluid p-0 m-0 overflow-hidden'>
        <PageHeader title='Aprendizaje profundo y neumonía' subtitle='modelo de clasificación de imágenes de rayos-X para una detección más rápida' size='m' />

        <div className='bg-info container-fluid d-flex text-primary-dark flex-column justify-content-center align-items-center py-2'>
          <p className='fs-3 fw-bold m-0'>TFM-Bioinformàtica i Bioestadística Àrea 4</p>
        </div>

        <div className='bg-success-light row text-primary-dark py-5 justify-content-center'>
          <div className='col-10 col-md-8 col-lg-6 d-flex flex-wrap justify-content-center'>
            <Form onSubmit={classifyImage}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image to classify</Form.Label>
                <Form.Control type="file" onChange={uploadToClient} />
              </Form.Group>

              <input type='submit' name='submit' id='submit'/>
            </Form>
          </div>
        </div>

        {result !== undefined && (
            <div className='bg-success-light row text-primary-dark py-5 justify-content-center'>
              <div className='col-10 col-md-8 col-lg-6 d-flex flex-wrap justify-content-center'>
                <div className="container">
                  <h1>Predicted Class: {result.class_name}</h1>
                  <hr />
                  <div>
                    <Image alt={""} src={ apiHost + "/" + result.image_path } className="img-rounded" width="400" height="200" />
                  </div>
                </div>
              </div>
            </div>
        )}

      </DefaultLayout>
  )
}