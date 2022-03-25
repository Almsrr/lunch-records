import { FC, useState, FormEvent } from "react";
import styled from "styled-components";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { NewRecord } from "../../types/NewRecord";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Checkbox } from "../Checkbox";

interface RecordFormProps {
  edit?: boolean;
  onSubmit(record: NewRecord): void;
  onFinish?: () => void;
  title: string;
}

export const RecordForm: FC<RecordFormProps> = ({
  edit,
  onSubmit,
  onFinish,
  title,
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
      phoneNumber: "",
      age: 0,
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
      <Title>{title}</Title>
      <section className="mb-3">
        <Subtitle>Personal</Subtitle>
        <Row>
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
          <Col xs={3} className="mb-2">
            <Input
              id="age"
              label="Age"
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </Col>
          <Col xs={9}>
            <Input
              id="address"
              label="Address (optional)"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Col>
        </Row>
      </section>
      <section className="mb-3">
        <Subtitle>Contact</Subtitle>
        <Row>
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
              pattern="[0-9]{10-11}"
            />
          </Col>
        </Row>
      </section>
      <section className="mb-4">
        <Subtitle>Restaurant</Subtitle>
        <Row>
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
      </section>
      <Actions>
        <ButtonSecundary type="button" onClick={finish}>
          {!editMode ? "Finish" : "Cancel"}
        </ButtonSecundary>
        <ButtonPrimary type="submit" onClick={submit}>
          {!editMode ? "Add" : "Save changes"}
        </ButtonPrimary>
      </Actions>
    </Form>
  );
};

const Form = styled.form`
  width: 90%;
  max-width: 600px;
  padding: 2rem;
  border: 1px solid #d0d0d0;
  background-color: #fff;
  border-radius: 0.5rem;
`;

const Title = styled.h1`
  font-weight: 700;
  color: #003366;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #888888;
`;

const Actions = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ButtonPrimary = styled.button`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background-color: #003366;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  border: none;
`;

const ButtonSecundary = styled.button`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  color: #003366;
  background-color: transparent;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  border: none;
`;
