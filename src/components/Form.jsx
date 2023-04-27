import { useState } from "react";
import validate from "./validate";
import { nanoid } from "nanoid";
import axios from "axios";
import {
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import "../App.css";
const color = { color: "red" };
const Form = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setFormError] = useState({});
  const [error, setError] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const newData = { ...values, [e.target.name]: e.target.value };
    setValues(newData);
    console.log(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(values);
    console.log(err);
    setFormError(err);

    if (Object.keys(err).length > 0) {
      setError(true);
      return;
    }

    const userData = {
      email: values.email,
      name: values.fullName,
      message: values.message,
      id: nanoid(),
    };
    setLoading(true);

    axios
      .post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        userData
      )
      .then((response) => {
        console.log(response.data);
        console.log(Object.values(response.data));

        setError(false);
        setFormError(false);
        setIsSubmit(true);
        setRecords([...records, values]);
        setValues({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setIsSubmit(false);
      });
  };
  return (
    <div className="container">
      <h2>
        Contact <span className="span"> Us</span>
      </h2>

      {error && (
        <Alert
          status="error"
          w="70%"
          m="20px auto"
          // alignSelf={"center"}
          textAlign={"center"}
          fontSize={"16px"}
        >
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}

      {isSubmit && (
        <Alert
          status="success"
          w="70%"
          m="20px auto"
          textAlign={"center"}
          fontSize={"16px"}
        >
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <FormControl marginBottom={"15px"} isInvalid={errors.fullName}>
          <FormLabel> Name</FormLabel>
          <Input
            variant={"flushed"}
            type="text"
            name="fullName"
            onChange={handleChange}
            value={values.fullName}
            placeholder="full name"
          />
          {errors.fullName && (
            <FormErrorMessage style={color}>{errors.fullName}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginBottom={"15px"} isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            variant={"flushed"}
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="chi@gmail.com"
          />
          {errors.email && (
            <FormErrorMessage style={color}> {errors.email}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl marginBottom={"15px"}>
          <FormLabel>
            Subject <p> (optional) </p>
          </FormLabel>
          <Input
            variant={"flushed"}
            // border={"1px solid white"}
            type="text"
            name="subject"
            onChange={handleChange}
            value={values.subject}
          />
        </FormControl>

        <FormControl marginBottom={"15px"} isInvalid={errors.message}>
          <FormLabel>Message</FormLabel>
          <Textarea
            variant={"flushed"}
            type="text"
            name="message"
            placeholder="Write us a message......."
            rows="6"
            value={values.message}
            onChange={handleChange}
          />
          {errors.message && (
            <FormErrorMessage style={color}>{errors.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          width={"90%"}
          alignSelf={"center"}
          m="20px 0"
          isLoading={loading}
          fontSize={"20px"}
          borderTopRightRadius={"20px"}
          borderBottomLeftRadius={"20px"}
          type="submit"
          colorScheme="green"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
