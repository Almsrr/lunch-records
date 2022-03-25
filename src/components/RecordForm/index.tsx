import { FC, useState, FormEvent } from "react";
import styled from "styled-components";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { NewRecord } from "../../types/NewRecord";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Checkbox } from "../Checkbox";

interface RecordFormProps {
  edit?: boolean;
  onSubmit(record: NewRecord): void;
  onFinish?: () => void;
}

export const RecordForm: FC<RecordFormProps> = ({
  edit,
  onSubmit,
  onFinish,
}) => {
  const [editMode] = useState(edit || false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foodDelivered, setFoodDelivered] = useState(false);
  const [comment, setComment] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();

    //validate data

    //isEmpty
    //Regex for phoneNumber

    const record = {
      firstName: "",
      lastName: "",
      phone: "",
      age: "",
      address: "",
      foodDelivered: false,
      email: "",
      comment: "",
    };
    onSubmit(record);

    //clean inputs
    setFirstName("");
  };

  const finish = () => {
    //if there is data in form
    const confirmed = window.confirm(
      "Are you sure do you want leave this page? All the data will be lost"
    );
    if (confirmed) {
      onFinish!();
    }
  };

  return (
    <Form onSubmit={submit}>
      <Heading>Personal</Heading>
      <Row className="mb-3">
        <Col xs={6} className="mb-2">
          <Input
            id="first-name"
            label="First Name"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Col>
        <Col xs={6} className="mb-2">
          <Input
            id="last-name"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Col>
        <Col xs={6} className="mb-2">
          <Input
            id="age"
            label="Age"
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
        </Col>
        <Col xs={12}>
          <Input
            id="address"
            label="Address (optional)"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Col>
      </Row>
      <Heading>Contact</Heading>
      <Row className="mb-3">
        <Col xs={6}>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Col>
        <Col xs={6}>
          <Input
            id="phone-number"
            label="Phone Number (optional)"
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </Col>
      </Row>
      <Heading>Restaurant</Heading>
      <Row className="mb-3">
        <Col x={12} className="mb-2">
          <Checkbox
            id="food-delivered"
            label="Food Delivered"
            onChange={isChecked => setFoodDelivered(isChecked)}
          />
        </Col>
        <Col xs={12}>
          <Textarea
            id="comment"
            label="Comment (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={6}
          />
        </Col>
      </Row>
      <Actions>
        <Button variant="outline-secondary" type="button" onClick={finish}>
          {!editMode ? "Finish" : "Cancel"}
        </Button>
        <Button variant="success" type="submit" onClick={submit}>
          {!editMode ? "Add" : "Save changes"}
        </Button>
      </Actions>
    </Form>
  );
};

const Form = styled.form`
  width: 90%;
  max-width: 550px;
`;

const Heading = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
