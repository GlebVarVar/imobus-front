import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { getData, postData } from '../../services/API';

import Messenger from './FormComponents/Messenger';

// default values for messengerList
const messengerListDefaultValues = [
    {
        id: 1,
        name: 'VK',
        text: '',
        characterLimit: 4096,


        viewType: false,
        
        maxButtonsCountStandard: 40,
        maxButtonTextLengthStandard: Infinity,
        linkButtonStandard: true,

        maxButtonsCountInline: 10,
        maxButtonTextLengthInline: Infinity,
        linkButtonInline: true,
        linkButtonInlineMax: null,

        buttonsCount: 0,
        buttons: [],
    },
    {
        id: 2,
        name: 'WhatsApp',
        text: '',
        characterLimit: 1000,


        viewType: false,
        
        maxButtonsCountStandard: 10,
        maxButtonTextLengthStandard: 20,
        linkButtonStandard: false,

        maxButtonsCountInline: 3,
        maxButtonTextLengthInline: 10,
        linkButtonInline: true,
        linkButtonInlineMax: 1,
        

        buttonsCount: 0,
        buttons: [],
    },
    {
        id: 3,
        name: 'Telegram',
        text: '',
        characterLimit: 4096,


        viewType: false,
        
        maxButtonsCountStandard: null,
        maxButtonTextLengthStandard: null,
        linkButtonStandard: false,

        maxButtonsCountInline: Infinity,
        maxButtonTextLengthInline: 64,
        linkButtonInline: true,
        linkButtonInlineMax: null,
        

        buttonsCount: 0,
        buttons: [],
    },
    {
        id: 4,
        name: 'SMS',
        text: '',
        characterLimit: null,


        viewType: false,
        
        maxButtonsCountStandard: null,
        maxButtonTextLengthStandard: null,
        linkButtonStandard: false,

        maxButtonsCountInline: null,
        maxButtonTextLengthInline: null,
        linkButtonInline: null,
        linkButtonInlineMax: null,
        

        buttonsCount: 0,
        buttons: null,
    },
];

// вспомогательная функция для отображения лоадера
function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}
  
function FORM() {

    const [messengerList, setMessengerList] = useState(messengerListDefaultValues);
    const [userName, setUserName] = useState('');

    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);


    const save = async (e, type) => {
        e.preventDefault();
        setValidated(true);

        if (userName.length > 0) {
            setLoading(true);
            if (type == 'import') {
                // импорт данных
                const responce = await getData(userName);

                responce.data !== null &&
                responce.data.Messengers.map((messenger, index) => {
                    const newMessengerList = [...messengerList];

                    const {messengerName, text, Buttons, inline} = messenger;
                    for (let i = 0; i < newMessengerList.length; i++) {
                        
                        if (newMessengerList[i].name == messengerName) {
                            newMessengerList[i].text = text;
                            newMessengerList[i].buttonsCount = Buttons.length;
                            newMessengerList[i].viewType = inline;

                            messenger.Buttons.map((button, index) => {
                                const {link, text, number} = button;
                                newMessengerList[i].buttons.push({
                                    id: number,
                                    link: link,
                                    text: text,
                                });
                            });
                            // newMessengerList[i].buttons = messenger.buttons;
                        }
                    }
                    setMessengerList(newMessengerList);
                });

                await simulateNetworkRequest();
                setLoading(false);
                
            } else {
                
                const responce = await postData(userName, messengerList);
                await simulateNetworkRequest();
                setLoading(false);
            }
            
        } 
    };

  

    return (
        <div className="mx-auto" style={{width: '40%', marginTop:'100px'}}>

            <Form noValidate validated={validated}  style={{marginBottom: '50px'}}>

                {/* поле ввода имени пользователя */}
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

                {/* импорт данных из базы данных */}
                <Button disabled={isLoading} onClick = {(e) => save(e, 'import')}>
                    {
                        isLoading ?  'Please wait…'  :  'Import data'
                    }
                </Button>
                

                <Accordion defaultActiveKey="0"  >
                    <Messenger messengerList={messengerList} setMessengerList = {setMessengerList}/>
                </Accordion>

                {/* сохранение данных в базу данных */}
                <Button  disabled={isLoading} onClick = {(e) => save(e, 'save')}>
                    {
                        isLoading ?  'Please wait…'  :  'Save data'
                    }
                </Button>

            </Form>
        </div>
    );
}

export default FORM;