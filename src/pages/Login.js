/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import {
  Card, Row, Col, Button, Form,
} from 'react-bootstrap';
import { Component } from 'react';
import paths from '../router/route-paths';
import AuthManager from '../services/AuthManager';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

 onChangeEmail = (e) => {
   this.setState({ email: e.target.value });
 };

 onChangePassword = (e) => {
   this.setState({ password: e.target.value });
 };

  onSubmit = () => {
    const { email } = this.state;
    AuthManager.login();
  }

  render() {
    const { email, password } = this.state;
    return (
      <Row>
        <Col sm={{ span: 12 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Link to={paths.signup} className="float-right">
                <Button typy="button" variant="outline-primary">
                  Sign up
                </Button>
              </Link>
              <Card.Title>Sign in</Card.Title>
              <Form onSubmit={this.onSubmit}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={email} onChange={this.onChangeEmail} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={password} onChange={this.onChangePassword} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

// /* eslint-disable no-unused-vars */
// import { Link } from 'react-router-dom';
// import {
//   Card, Row, Col, Button, Form,
// } from 'react-bootstrap';
// import { Component, useState } from 'react';
// import paths from '../router/route-paths';
// import AuthManager from '../services/AuthManager';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // export default class Login extends Component {
//   //   constructor(props) {
//   //     super(props);
//   //     this.state = {
//   //       email: '',
//   //       password: '',
//   //     };
//   //   }

//   function onChangeEmail(e) {
//     setEmail(e.target.value);
//   }

//   function onChangePassword(e) {
//     setPassword(e.target.value);
//   }

//   function onSubmit() {
//     // const { email } = this.state;
//     AuthManager.login();
//   }

//   // render() {
//   //  const { email, password } = this.state;
//   return (
//     <Row>
//       <Col sm={{ span: 12 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
//         <Card>
//           <Card.Body>
//             <Link to={paths.signup} className="float-right">
//               <Button typy="button" variant="outline-primary">
//                 Sign up
//               </Button>
//             </Link>
//             <Card.Title>Sign in</Card.Title>
//             <Form onSubmit={onSubmit()}>
//               <Form.Group>
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control value={email} onChange={onChangeEmail} type="email"
// placeholder="Enter email" />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control value={password} onChange={onChangePassword} type="password"
// placeholder="Password" />
//               </Form.Group>
//               <Button variant="primary" type="submit" block>
//                 Submit
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   );
// }
// // }

// // }
