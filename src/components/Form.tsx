import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Button, Input, Text } from "@chakra-ui/react";

// Добавление кастомного метода для Yup
Yup.addMethod(Yup.number, "moreThanSumOfFields", function (fields: string[]) {
  return this.test(
    "moreThanSumOfFields",
    "Общая площадь должна быть больше суммы жилой площади и площади кухни",
    function (value) {
      const { parent } = this;
      const sumOfFields = fields.reduce(
        (sum: number, field: string) => sum + (parent[field] || 0),
        0
      );
      return !!value && value > sumOfFields;
    }
  );
});

// Валидационная схема
const validationSchema = Yup.object({
  name: Yup.string().required("Поле обязательно для заполнения"),
  address: Yup.string().required("Поле обязательно для заполнения"),
  floor: Yup.number()
    .min(-1, "Значение не может быть меньше -1")
    .required("Поле обязательно для заполнения"),
  totalFloors: Yup.number()
    .min(-3, "Значение не может быть меньше -3")
    .max(200, "Значение не может быть больше 200")
    .required("Поле обязательно для заполнения"),
  square: Yup.number()
    .min(0, "Значение не может быть меньше 0")
    .max(400, "Значение не может быть больше 400")
    .required("Поле обязательно для заполнения")
    .moreThanSumOfFields(["livingSquare", "kitchenSquare"]),
  livingSquare: Yup.number()
    .min(0, "Значение не может быть меньше 0")
    .required("Поле обязательно для заполнения"),
  kitchenSquare: Yup.number()
    .min(0, "Значение не может быть меньше 0")
    .required("Поле обязательно для заполнения"),
});

const InfoForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        floor: 0,
        totalFloors: 0,
        square: 0,
        livingSquare: 0,
        kitchenSquare: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted values:", values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* Название объекта */}
          <Box mb={4}>
            <label>Название объекта</label>
            <Field name="name" as={Input} placeholder="Введите название" />
            {touched.name && errors.name && (
              <Text color="red.500">{errors.name}</Text>
            )}
          </Box>

          {/* Адрес */}
          <Box mb={4}>
            <label>Адрес</label>
            <Field name="address" as={Input} placeholder="Введите адрес" />
            {touched.address && errors.address && (
              <Text color="red.500">{errors.address}</Text>
            )}
          </Box>

          {/* Этаж */}
          <Box mb={4}>
            <label>Этаж</label>
            <Field
              name="floor"
              type="number"
              as={Input}
              placeholder="Введите этаж"
            />
            {touched.floor && errors.floor && (
              <Text color="red.500">{errors.floor}</Text>
            )}
          </Box>

          {/* Количество этажей в доме */}
          <Box mb={4}>
            <label>Количество этажей в доме</label>
            <Field
              name="totalFloors"
              type="number"
              as={Input}
              placeholder="Введите количество этажей"
            />
            {touched.totalFloors && errors.totalFloors && (
              <Text color="red.500">{errors.totalFloors}</Text>
            )}
          </Box>

          {/* Площадь */}
          <Box mb={4}>
            <label>Площадь</label>
            <Field
              name="square"
              type="number"
              as={Input}
              placeholder="Введите площадь"
            />
            {touched.square && errors.square && (
              <Text color="red.500">{errors.square}</Text>
            )}
          </Box>

          {/* Жилая площадь */}
          <Box mb={4}>
            <label>Жилая площадь</label>
            <Field
              name="livingSquare"
              type="number"
              as={Input}
              placeholder="Введите жилую площадь"
            />
            {touched.livingSquare && errors.livingSquare && (
              <Text color="red.500">{errors.livingSquare}</Text>
            )}
          </Box>

          {/* Площадь кухни */}
          <Box mb={4}>
            <label>Площадь кухни</label>
            <Field
              name="kitchenSquare"
              type="number"
              as={Input}
              placeholder="Введите площадь кухни"
            />
            {touched.kitchenSquare && errors.kitchenSquare && (
              <Text color="red.500">{errors.kitchenSquare}</Text>
            )}
          </Box>

          <Button type="submit" colorScheme="blue">
            Отправить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default InfoForm;
