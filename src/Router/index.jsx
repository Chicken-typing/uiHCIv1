import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import Customer from "../pages/Customer";
import {
  MainPage,
  Woman,
  Man,
  Kid,
  Brand,
} from "../containers/CustomerContainer";
import {
  AccountTab,
  DasboardTab,
  OrderTab,
  ProductListTab,
  SettingTab,
  AddProductTab
} from '../containers/AdminContainer'
import ProductDetail from '../containers/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Shipping from '../components/Shipping';
import Payment from '../components/Payment';
import ProtectedRoute from './ProtectedRoute';
import PlaceOrder from "../components/PlaceOrder";
import Protected from "./Protected";
import ThanksPage from "../pages/ThanksPage";
import MyAccountPage from "../pages/MyAccountPage";
import Banned from "../pages/Banned";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
function Router() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/ResetPassword" element={<ResetPassword/>}/>
      <Route path="/" element={<Customer />}>
        <Route path="" element={<Navigate to="home" replace />} />
        <Route path="home" element={<MainPage />} />
        <Route path="woman" element={<Woman />} />
        <Route path="man" element={<Man />} />
        <Route path="kid" element={<Kid />} />
        <Route path="brand" element={<Brand />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Protected><Checkout/></Protected>}>
          {/* <Route path="" element={<Navigate to="checkout" replace />}/> */}
          <Route path="shippingAddress" element={<Protected><Shipping/></Protected>} />
          <Route path='payment' element={<Protected><Payment/></Protected>}/>
          <Route path="placeOrder" element={<Protected><PlaceOrder/></Protected>} />
        </Route>
      </Route>
      <Route path="/thanks" element={<Protected><ThanksPage /></Protected>} />
      <Route path="/:id/account" element={<Protected><MyAccountPage /></Protected>} />

      {/* admin page */}
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} >
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="product-list" element={<ProtectedRoute><ProductListTab /></ProtectedRoute>} />
        <Route path="setting" element={<ProtectedRoute><SettingTab /></ProtectedRoute>} />
        <Route path="add-product" element={<ProtectedRoute><AddProductTab /></ProtectedRoute>} />
        <Route path="accounts" element={<ProtectedRoute><AccountTab /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><DasboardTab /></ProtectedRoute>} />
        <Route path="order" element={<ProtectedRoute><OrderTab /></ProtectedRoute>} />
      </Route>
      <Route path="/:id/banned" element={<Banned/>}/>
    </Routes>

  )
}

export default Router;
