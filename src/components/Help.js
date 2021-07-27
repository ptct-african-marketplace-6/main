import React from 'react'
import { Container, Card } from 'react-bootstrap';

const Help = () => {

  return (
    <div className="home-wrapper">
      <div className='App'><br/>
      <Container>
        <Card bg="light">
          <Card.Header><h3>Welcome to Sauti Market Help Page!</h3></Card.Header>
          <div>
            <Card.Body>
              This is where you can come to if you need help with listing your items or have general questions about the online marketplace.
            </Card.Body>
            <Card.Body>
              No obstacle is too big or too small; we are here to help you expand your business. Don't hesitate to reach out to us using the contact form below. We will have one of our knowledgeable staff members reach out to you for assistance shortly!
            </Card.Body>
          </div>
          {/* </Card>
          <Card> */}
          <div className='text-center'>
            <div className='form-signin'>
              <br/>
              <form className='text-center'>
              <h1 className='h3 mb-3 fw-normal'>
                How Can We Help?
              </h1>
              <div className='form-floating'>
                <input
                  name='username'
                  className='form-control'
                  id='floatingInput'
                  type='text'
                />
                <label htmlFor='floatingInput'>Type Your Question Here</label>
              </div>

              <div className='form-floating'>
                <input
                  name='email'
                  type='text'
                  className='form-control'
                  id='floatingInput'
                />
              <label htmlFor='floatingEmail'>Contact Email</label>
              </div>
                <br/>
                <div className='row'><br/>
                  <button className="w-100 btn btn-lg btn-success">Submit!</button>
                </div>
              </form>
            </div>
          </div>
          </Card>
        </Container>


        </div>
    </div>
  )
}

export default Help