import Accordion from 'react-bootstrap/Accordion';
import { Reorder } from 'framer-motion';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';

import Badge from 'react-bootstrap/Badge';
import { useState } from 'react';



const MessengerItem = ({messenger, index, setMessengerList, messengerList}) => {
    const [disabled, setDisabled] = useState(false);


    // проверка кнопки на доступность
    function check(messenger) {
        if (messenger.viewType == true) {
            if (messenger.maxButtonsCountInline <= messenger.buttons.length) {
                return setDisabled(true);
            } else {
                return setDisabled(false);
            }
        } else {
            if (messenger.maxButtonsCountStandard <= messenger.buttons.length) {
                return setDisabled(true);
            } else {
                return setDisabled(false);
            }
        }
    }




    function addButtonOnClick(e) {
        e.preventDefault();
        
        const newMessengerList = [...messengerList];
        newMessengerList[index].buttons.push({
            id: messenger.buttons.length + 1,
            text: '',
            link: false,
        });
        setMessengerList(newMessengerList);
        check(messenger);
    }


    function textAreaOnChange(e) {
        const newMessengerList = [...messengerList];
        newMessengerList[index].text = e.target.value.substring(0, messenger.characterLimit);
        setMessengerList(newMessengerList);
    }


    function switcherOnChange() {
        const newMessengerList = [...messengerList];
        const {viewType, maxButtonsCountInline, buttons, maxButtonsCountStandard} = newMessengerList[index];

        newMessengerList[index].viewType = !viewType;
        if (newMessengerList[index].viewType) {
            if (newMessengerList[index].buttons.length > maxButtonsCountInline) {
                newMessengerList[index].buttons = buttons.slice(0, maxButtonsCountInline);
            }
        } else {
            if (newMessengerList[index].buttons.length > maxButtonsCountStandard) {
                newMessengerList[index].buttons = buttons.slice(0, maxButtonsCountStandard);
            }
        }
        setMessengerList(newMessengerList);
        check(messenger);
    }


    function buttonTextOnChange(value, num) {
        const newMessengerList = [...messengerList];
        const {viewType, maxButtonTextLengthInline, maxButtonTextLengthStandard} = messenger;
        viewType ? 
            newMessengerList[index].buttons[num].text = value.substring(0, maxButtonTextLengthInline) 
            : newMessengerList[index].buttons[num].text = value.substring(0, maxButtonTextLengthStandard);

        setMessengerList(newMessengerList);
    }


    function linkCheckboxOnChange(num) {
        const newMessengerList = [...messengerList];
        newMessengerList[index].buttons[num].link = !newMessengerList[index].buttons[num].link; 
        

        setMessengerList(newMessengerList);
    }


    return (
        
        <Accordion.Item eventKey={messenger.id} style = {{marginTop: '25px'}}>
            <Accordion.Header>{messenger.name}</Accordion.Header>
            <Accordion.Body>
                {/* свитчер */}
                <Row>
                    <Form.Check
                        checked = {messenger.viewType}
                        // state change handler for viewType
                        onChange = {switcherOnChange} 
                        type="switch"
                        id="custom-switch"
                        label="inline-отображение"
                    />
                </Row>
                {
                    // поле для текста
                    messenger.characterLimit && 
                        <Row style = {{marginTop: '25px'}}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Your text</Form.Label>
                                <Form.Control 
                                    as="textarea"  
                                    rows={3} 
                                    value={messenger.text} 
                                    onChange={(e) => textAreaOnChange(e)} 
                                    isInvalid={(messenger.text.length > messenger.characterLimit)} 
                                />

                                <Badge 
                                    className = "mt-3" 
                                    bg = {`${messenger.text.length > messenger.characterLimit ? 'danger' : 'primary'}`}>

                                    {messenger.text.length}/{messenger.characterLimit}
                                </Badge>
                            </Form.Group>
                        </Row>
                }
                {/* поле для кнопок */}
                {
                    messenger.buttons && 
                    (messenger.maxButtonsCountStandard || 
                    (messenger.viewType && messenger.maxButtonTextLengthInline)) &&

                    <Row style = {{marginTop: '25px'}}>
                        <Row style = {{marginBottom: '25px'}}>
                            <Col>
                                <Button 
                                    variant="primary"
                                    disabled={disabled}    
                                    onClick={(e) => addButtonOnClick(e)}>
                                        
                                    Add button
                                </Button>
                            </Col>
                            <Col>

                                <Badge className="float-end">
                                    {
                                        messenger.viewType ? 
                                            messenger.maxButtonsCountInline - messenger.buttons.length : 
                                            messenger.maxButtonsCountStandard - messenger.buttons.length
                                    } 
                                    available
                                </Badge>
            
                            </Col>
                        </Row>
                        {
                            
                            messenger.buttons.map((button, num) => {
                                return(
                                    <Row style = {{marginTop: '25px'}} key={num}>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Button text</Form.Label>
                                                <Form.Control 
                                                    placeholder="Text here!" 
                                                    value={button.text}
                                                    onChange={(e) => {buttonTextOnChange(e.target.value, num);}}/>
                                            </Form.Group>
                                            <Badge>
                                                {
                                                    messenger.viewType ? 
                                                        `${messenger.buttons[num].text.length}/${messenger.maxButtonTextLengthInline}` : 
                                                        `${messenger.buttons[num].text.length}/${messenger.maxButtonTextLengthStandard}`
                                                }
                                            </Badge>
                                        </Col>
                                        
                                        {
                                            messenger.linkButtonInline &&
                                            <Col xs lg="2" >
                                                
                                                <Form.Check
                                                    onChange={(num) => {linkCheckboxOnChange(num);}}
                                                    className="float-end"
                                                    style={{
                                                        position: 'relative',
                                                        top: '50%'}}
                                                    type="checkbox"
                                                    checked={button.link}
                                                    id="default-checkbox"
                                                    label="Link"

                                                />
                                            </Col>
                                        }
                                        
                                        
                                    </Row>
                                );
                            })
                        }
                        
                        
                    </Row>
                }
            </Accordion.Body>
        </Accordion.Item>

    );
};


const Messengers = ({ messengerList = [], setMessengerList }) => {
    

    return (
        <Reorder.Group axys = "y" values={messengerList} onReorder={setMessengerList}>
            {
                messengerList.map((messenger, index) => {
                    return (
                        <Reorder.Item value={messenger} key={index}>
                            <MessengerItem 
                                messenger={messenger} 
                                index={index} 
                                messengerList={messengerList} 
                                setMessengerList={setMessengerList}/>
                        </Reorder.Item>
                    );  
                })
            }
        </Reorder.Group>
    );
};


export default Messengers;