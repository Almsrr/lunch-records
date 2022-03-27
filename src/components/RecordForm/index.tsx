import { FC, useState, FormEvent, useEffect } from "react";
import styled from "styled-components";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { NewRecord } from "../../types/NewRecord";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Checkbox } from "../Checkbox";
import { useInput } from "../../hooks/useInput";
import { ModalOptions } from "../../types/ModalOptions";

interface RecordFormProps {
  edit?: boolean;
  title: string;
  initials?: NewRecord;
  onSubmit(record: NewRecord): void;
  onFinish: () => void;
  onModal: (opts: ModalOptions) => void;
}

const isEmpty = (str: string) => str.trim() === "";
const ageOutOfRange = (age: string) => Number(age) <= 0;

export const RecordForm: FC<RecordFormProps> = ({
  edit,
  onSubmit,
  onFinish,
  title,
  onModal,
  initials,
}) => {
  const [editMode] = useState(edit || false);

  const [
    firstName,
    invalidFirstName,
    changeFirstName,
    blurFirstName,
    resetFirstName,
    setFirstName,
  ] = useInput(isEmpty);
  const [
    lastName,
    invalidLastName,
    changeLastName,
    blurLastName,
    resetLastName,
    setLastName,
  ] = useInput(isEmpty);
  const [age, invalidAge, changeAge, blurAge, resetAge, setAge] =
    useInput(ageOutOfRange);
  const [email, invalidEmail, changeEmail, blurEmail, resetEmail, setEmail] =
    useInput(isEmpty);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foodDelivered, setFoodDelivered] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    //initialize values
    if (initials) {
      const {
        firstName,
        lastName,
        age,
        address,
        email,
        phoneNumber,
        comment,
        foodDelivered,
      } = initials;

      setFirstName(firstName);
      setLastName(lastName);
      setAge(age.toString());
      setAddress(address);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setComment(comment);
      setFoodDelivered(foodDelivered);
    }
  }, [initials, setFirstName, setLastName, setAge, setEmail]);

  const invalidForm =
    invalidFirstName || invalidLastName || invalidAge || invalidEmail;

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const emptyRequiredFields = !firstName || !lastName || !age || !email;

    if (emptyRequiredFields) {
      onModal({
        show: true,
        type: "error",
        message: "Required fields are empty",
      });

      blurFirstName();
      blurLastName();
      blurAge();
      blurEmail();
      return;
    }

    const record = {
      firstName,
      lastName,
      phoneNumber,
      age,
      address,
      foodDelivered,
      email,
      comment,
    };
    onSubmit(record);

    //clean fields
    resetFirstName();
    resetLastName();
    resetAge();
    setAddress("");
    resetEmail();
    setPhoneNumber("");
    setFoodDelivered(false);
    setComment("");
  };

  const finish = () => {
    //if there is data in fields
    if (!edit) {
      const dataInFields =
        firstName || lastName || age || address || email || phoneNumber;
      if (dataInFields) {
        onModal({
          show: true,
          type: "warning",
          message:
            "Are you sure do you want leave this page? All the data will be lost",
        });
      } else {
        onFinish();
      }
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
              onChange={changeFirstName}
              invalid={invalidFirstName}
              errorMessage="Required field"
              onBlur={blurFirstName}
            />
          </Col>
          <Col xs={6} className="mb-2">
            <Input
              id="last-name"
              label="Last Name"
              type="text"
              value={lastName}
              onChange={changeLastName}
              invalid={invalidLastName}
              errorMessage="Required field"
              onBlur={blurLastName}
            />
          </Col>
          <Col xs={3} className="mb-2">
            <Input
              id="age"
              label="Age"
              type="number"
              value={age}
              onChange={changeAge}
              invalid={invalidAge}
              errorMessage="Invalid age"
              onBlur={blurAge}
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
              onChange={changeEmail}
              invalid={invalidEmail}
              errorMessage="Required field"
              onBlur={blurEmail}
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
      </section>
      <section className="mb-4">
        <Subtitle>Restaurant</Subtitle>
        <Row>
          <Col x={12} className="mb-2">
            <Checkbox
              id="food-delivered"
              label="Food Delivered"
              onChange={isChecked => setFoodDelivered(isChecked)}
              value={foodDelivered}
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
        <ButtonPrimary type="submit" onClick={submit} disabled={invalidForm}>
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

const ButtonPrimary = styled.button<{ disabled?: boolean }>`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background-color: ${props => (props.disabled ? "#c0c0c0" : "#003366")};
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
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
