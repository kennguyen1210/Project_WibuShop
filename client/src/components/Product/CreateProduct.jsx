/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateProduct,
  setEditProduct,
} from "../../redux/productsSlice";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
/* eslint-disable react/prop-types */
function CreateProduct(props) {
  const { editProduct } = useSelector((state) => state.products);
  console.log("edit", editProduct);
  const notifySuccess = () =>
    toast.success("Success!", { position: "top-right", autoClose: 2000 });
  const notifyError = () =>
    toast.error("Error!", { position: "top-right", autoClose: 2000 });
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const [initValue, setInitValue] = useState({
    productName: "",
    image: undefined,
    anime: "",
    generic: "",
    price: "",
    inventory: "",
    description: "",
    discount: "",
    productId: "",
  });
  const [products, setProducts] = useState([]);
  const checkExist = (id) => {
    if (Object.keys(editProduct).length === 0) {
      const index = products.findIndex((item) => item.id === id);
      if (index !== -1) {
        return true;
      }
    }
    return false;
  };
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required!"),
    productId: Yup.number()
      .min(4, "Product id must be at least 4 characters !")
      .test(
        "checkId",
        "Product id exist, chose defferent Id!",
        (value) => !checkExist(value)
      )
      .required("Product id is required!"),
    image: Yup.mixed()
      .required("File is required!")
      .test(
        "fileSize",
        "File size must be under 5MB.",
        (value) => value && value.size <= 5000000
      ),
    anime: Yup.mixed().required("Anime is required!"),
    generic: Yup.string().required("Generic is required!"),
    price: Yup.number()
      .positive("Price is number positive")
      .required("Price is required!"),
    inventory: Yup.number()
      .integer("Inventory is number")
      .positive("Inventory is integer")
      .required("Inventory is required!"),
    description: Yup.string().required("Description is required!"),
    discount: Yup.number()
      .integer("Discount is number")
      .positive("Discount is integer")
      .required("Discount is required!"),
  });

  const { showForm, check } = props;
  const [hiden, setHiden] = useState(false);
  useEffect(() => {
    hiden ? showForm() : "";
  }, [hiden]);

  useEffect(() => {
    const call = async () => {
      const figures = await axios.get("http://localhost:3000/Figures");
      const t_shirts = await axios.get("http://localhost:3000/T-Shirts");
      setProducts([...figures.data, ...t_shirts.data]);
    };
    call();
  }, [check]);
  useEffect(() => {
    setInitValue({
      productName: "",
      image: undefined,
      anime: "",
      generic: "",
      price: "",
      inventory: "",
      description: "",
      discount: "",
      productId: "",
    });
  }, [setEditProduct]);
  const handleReset = () => {
    dispatch(setEditProduct({}));
    setHiden(true);
  };
  // const handleClick = () => {
  //   showForm();
  // };
  return (
    <div className="productForm">
      <span className="exitBtn" onClick={handleReset}>
        <i className="bi bi-x-lg"></i>
      </span>
      <Formik
        innerRef={formikRef}
        initialValues={
          Object.keys(editProduct).length > 0
            ? { ...editProduct, productId: editProduct.id }
            : initValue
        }
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const type = values.generic + "s";
          const id = values.productId;
          // const data = {...values, id: uuidv4()};
          const data = { ...values, id: values.productId };
          if (Object.keys(editProduct).length > 0) {
            try {
              const response = await axios.patch(
                `http://localhost:3000/${type}/${id}`,
                {
                  ...data,
                }
              );
              console.log(response.data);
              notifySuccess();
            } catch (error) {
              console.error(error);
              notifyError();
            }
            dispatch(setEditProduct({}));
            setHiden(true);
          } else {
            // call API
            try {
              const response = await axios.post(
                `http://localhost:3000/${type}`,
                {
                  ...data,
                }
              );
              console.log(response.data);
              notifySuccess();
            } catch (error) {
              console.error(error);
              notifyError();
            }
          }
          resetForm();
          dispatch(createOrUpdateProduct());
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <h6>Add And Edit Product</h6>
            <div className="form-item">
              <label htmlFor="productId">Product Id</label>
              <div className="input-item">
                <Field
                  type="text"
                  id="productId"
                  name="productId"
                  placeholder="Product ID"
                  readOnly={Object.keys(editProduct).length > 0 ? true : false}
                />
                <ErrorMessage
                  name="productId"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="productName">Product Name</label>
              <div className="input-item">
                <Field
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Product Name"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="image">Image</label>
              <div className="input-item">
                <Field
                  type="file"
                  id="image"
                  name="image"
                  value={undefined}
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="anime">Anime</label>
              <div className="input-item">
                <Field as="select" name="anime" id="anime">
                  <option value="">Chose a option</option>
                  <option value="onepiece">Onepiece</option>
                  <option value="bleach">Bleach</option>
                  <option value="naruto">Naruto</option>
                  <option value="kimetsuNoYaiba">Kimetsu No Yaiba</option>
                </Field>
                <ErrorMessage
                  name="anime"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="generic">Generic</label>
              <div className="input-item">
                <Field as="select" name="generic" id="generic">
                  <option value="">Chose a option</option>
                  <option value="Figure">Figure</option>
                  <option value="T-shirt">T-Shirt</option>
                </Field>
                <ErrorMessage
                  name="generic"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="price">Price ($)</label>
              <div className="input-item">
                <Field
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Example: 10"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="discount">Discount (%)</label>
              <div className="input-item">
                <Field
                  type="text"
                  id="discount"
                  name="discount"
                  placeholder="Example: 10"
                />
                <ErrorMessage
                  name="discount"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="inventory">Inventory</label>
              <div className="input-item">
                <Field
                  type="number"
                  id="inventory"
                  name="inventory"
                  placeholder="Example: 5"
                />
                <ErrorMessage
                  name="inventory"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="description">Description</label>
              <div className="input-item">
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  cols="30"
                  rows="4"
                  placeholder="Input some thing..."
                ></Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="errorMessage"
                ></ErrorMessage>
              </div>
            </div>
            <div className="submitBtn">
              <button className="saveBtn" type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProduct;
