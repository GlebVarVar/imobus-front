import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';



const ImportData = ({userName, setUserName, validated, setValidated}) => {
    
  
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        setValidated(true);
    };
  
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{marginBottom: '50px'}}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type = "text"
                        placeholder = "Linus Torvalds"
                        defaultValue = {userName}
                        onChange = {(e) => {
                            e.preventDefault();
                            setUserName(e.target.value);
                        }}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button  type="submit">
                Import data
            </Button>
        </Form>
    );
};

export default ImportData;