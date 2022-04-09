import {
  Col,
  Layout,
  Row,
  Button,
  Modal,
  Input,
  Tooltip,
  Form,
  Select,
  Switch,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getProductDetail, updateProduct } from "../../../redux/action";
import { modalState$, productDetailState$ } from "../../../redux/selectors";
import { hideModal } from "../../../redux/action";
import NumberFormat from "react-number-format";

export function UpdateProduct() {
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product2, setProduct] = useState([]);
  const [price, setPrice] = useState("");
  const [img, setImg] = useState();
  const updateProd = (product) => {
    dispatch(updateProduct.updateProductRequest(product));
  };
  const product = useSelector(productDetailState$);

  useEffect(() => {
    dispatch(getProductDetail.getProductDetailRequest(id));
    // const getProduct = async () => {
    // setLoading(true);

    // setLoading(false);
    // };
    // getProduct();
  }, [dispatch]);
  //data product
  //data product
  const UpdateProduct = () => {
    return (
      <div>
        <Form>
          <Row gutter={[8, 8]}>
            <Col span={14} style={{ background: "#f7f7f7" }}>
              <div style={{ minHeight: "100vh", padding: "8px" }}>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <div
                      style={{
                        height: "400px",
                        width: "418px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        style={{
                          height: "400px",
                          width: "418px",
                          objectFit: "contain",
                        }}
                        src={product.prodPicture}
                        alt={product.prodName}
                      ></img>
                    </div>
                  </Col>

                  <img hidden={true} src={img} alt={product.prodName}></img>
                </Row>
              </div>
            </Col>
            <Col span={10} style={{ background: "white", paddingLeft: "20px" }}>
              <div style={{ padding: "8px" }}>
                <Input
                  defaultValue={product.prodName}
                  onChange={(e) => (product.prodName = e.target.defaultValue)}
                  className="title-product-detail"
                  placeholder="Tên sản phẩm"
                />

                <div className="category-product-detail">
                  <Select
                    placeholder="Loại sản phẩm"
                    onChange={(e) => {
                      product.prodCate = e;
                    }}
                    defaultValue={product.prodCate}
                  >
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="camera">Camera</Select.Option>
                  </Select>
                </div>

                <div className="description-product-detail">
                  <Input.TextArea
                    placeholder="Mô tả"
                    className="description-product-detail"
                    defaultValue={product.prodDesc}
                    onChange={(e) => {
                      product.prodDesc = e.target.defaultValue;
                    }}
                  />
                </div>

                <NumberFormat
                  defaultValue={product.prodPrice}
                  className="price-product-detail"
                  thousandSeparator={true}
                  displayType={"text"}
                  renderText={(value, props) => (
                    <div {...props}>Giá ban đầu: {value} VNĐ</div>
                  )}
                />
                <Input
                  defaultValue={product.prodPrice}
                  onChange={(e) => {
                    product.prodPrice = e.target.defaultValue;
                  }}
                  placeholder="Giá sản phẩm"
                />
                <FileBase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  value={product.prodPicture}
                  onDone={(base64) => {
                    {
                      product.prodPicture = base64.base64;
                      setImg(base64.base64);
                    }
                  }}
                />
                <Button
                  className="btnAdd-product-detail"
                  onClick={() => updateProd(product)}
                >
                  Cập nhật
                </Button>
                <NavLink to={`/san-pham/${product._id}`}>
                  <Button className="btnAdd-product-detail">Hủy</Button>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  return (
    <>
      <div>
        <Layout style={{ paddingTop: "20px", background: "rgb(247 247 247)" }}>
          <UpdateProduct />
        </Layout>
      </div>
    </>
  );
}
