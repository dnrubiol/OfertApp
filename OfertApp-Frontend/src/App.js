import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/navBar";
import NotFound from "./components/common/notFound";
import PublicationView from "./components/Publication/publicationView";
import Verify from "./components/VerificationPage/verificationPage";
import DeliveryInfo from "./components/DeliveryInformation/deliveryInformation";
import ConfirmProductDelivery from "./components/DeliveryInformation/confirmDelivery";

import "react-toastify/dist/ReactToastify.css";

import TransactionHistory from "./components/TransactionHistory/transactionHistory";
import Statistics from "./components/Statistics/statistics";
import UserInfoEdit from "./components/UserInfoEdit/userInfoEdit";
import LoginForm from "./components/login/loginForm";
import Logout from "./components/logout";

import MainPage from "./components/Main Page/mainPage";
import AskResetPasswordForm from "./components/ResetPassword/askResetPasswordForm";
import NewPasswordForm from "./components/ResetPassword/newPasswordForm";
import CreatePublicationForm from "./components/Publication/Creation/createPublicationForm";
import FinancialTransactionsView from "./components/FinancialTransactions/account";

import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions/frequentlyAskedQuestions";

import OfertAppTeam from "./components/OfertAppTeam/ofertapp-team";
import "./App.css";

import UserReportsHistory from "./components/ReportsComponent/userReportsHistory";
import DetailedReport from "./components/ReportsComponent/detailedReport";

import { getUserInfo } from "./services/userService";

// Configure theme colors
const themeColors = {
  light: {
    "--ofertapp-general-text-color": "#000",
    "--ofertapp-inverse-text-color": "#fff",
    "--ofertapp-general-background-color": "#F5F1F1",
    "--ofertapp-inverse-background-color": "#000",
    "--ofertapp-background-image": "url(CoolBackground.jpg)",
    "--ofertapp-inverse-background-color-degraded": "rgba(0, 0, 0, 0.5)",
    "--ofertapp-inverse-background-color-degraded2": "rgba(0, 0, 0, 0.05)",
    "--ofertapp-alternative-background-color": "#f2f2f2",
    "--ofertapp-controls-background-color": "#017C41",
    "--ofertapp-page-title-text-color": "#737373",
    "--offertapp-div-lines-color": "#000",
    "--ofertapp-border-color": "#000",
    "--ofertapp-credits-background-color": "#d9d9d9"
  },
  dark: {
    "--ofertapp-general-text-color": "#fff",
    "--ofertapp-inverse-text-color": "#000",
    "--ofertapp-general-background-color": "#0d0d0d",
    "--ofertapp-inverse-background-color": "#fff",
    "--ofertapp-background-image": "url(CoolBackgroundDark.jpg)",
    "--ofertapp-inverse-background-color-degraded": "rgba(255, 255, 255, 0.5)",
    "--ofertapp-inverse-background-color-degraded2": "rgba(255, 255, 255, 0.05)",
    "--ofertapp-alternative-background-color": "#737373",
    "--ofertapp-controls-background-color": "#017C41",
    "--ofertapp-page-title-text-color": "#e6e6e6",
    "--offertapp-div-lines-color": "#fff",
    "--ofertapp-border-color": "#fff",
    "--ofertapp-credits-background-color": "#d9d9d9"
  }
};

class App extends Component {
  state = {
    userData: null,

    // Actually a useless state, but helps with rendering all components
    // with the correct theme
    theme: "light"
  };

  // Prevent component from updating twice
  shouldComponentUpdate(_, nextState) {
    return (nextState.userData !== this.state.userData || nextState.theme !== this.state.theme);
  }

  // Update components theme
  updateTheme = (newTheme) => {
    if (["light", "dark"].includes(newTheme) === true) {
      // Update theme colors
      Object.entries(themeColors[newTheme]).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });

      // Save theme
      localStorage.setItem("theme", newTheme);

      // Update state
      this.setState({
        theme: newTheme
      });
    }
  }

  // Get user data from backend
  async getUserData() {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        this.setState({
          userData: null,
        });
        return;
      }

      const responseData = await getUserInfo(token);

      const { data, status } = responseData.data;
      if (status === "success") {

        this.setState({
          userData: data
        });

      } else {
        this.setState({
          userData: null,
        });

        // Delete token for future actions
        localStorage.removeItem("token");
      }

    } catch (e) {

      // Delete token for future actions
      localStorage.removeItem("token");

      this.setState({
        userData: null,
      });
    }
  }

  // Get user data at start and always a update happens
  async componentDidMount() {
    await this.getUserData();

    // Get saved theme
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "light");
    } else {
      this.updateTheme(theme);
    }
  }

  // Useful for keeping a global value with user data
  updateUserData = () => {
    // Get again user data from backend
    this.getUserData();
  }

  render() {
    const { userData, theme } = this.state;
    return (
      <div style={{
        backgroundImage: "var(--ofertapp-background-image)",
        backgroundColor: "var(--ofertapp-general-background-color)",
      }}>
        <ToastContainer />
        <NavBar
          userData={userData}
          theme={theme}
          updateTheme={this.updateTheme}
        />
        <main
          className="container"
          style={{
            backgroundColor: "var(--ofertapp-general-background-color)",
          }}
        >
          <Routes>
            <Route path="/login"
              element={
                <LoginForm
                  OnUpdateUserData={this.updateUserData}
                  theme={theme}
                />
              }
            />
            <Route
              path="/askResetPassword"
              element={
                <AskResetPasswordForm
                  theme={theme}
                />
              }
            />
            <Route
              path="/createPublication"
              element={
                <CreatePublicationForm
                  userData={userData}
                />
              }
            />
            <Route
              path="/reports-history"
              element={
                <UserReportsHistory
                  userData={userData}
                />
              }
            />

            <Route
              path="/reset-password/:token/:user/"
              element={
                <NewPasswordForm
                  theme={theme}
                />
              }
            />
            <Route
              path="/register"
              element={
                <UserInfoEdit
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/homepage"
              element={
                <MainPage userPublications="false" />
              }
              key={window.location.pathname}
            />
            <Route
              path="/my-publications"
              element={
                <MainPage userPublications="true" />
              }
              key={window.location.pathname}
            />
            <Route
              path="/transaction-history"
              element={
                <TransactionHistory />
              }
            />
            <Route
              path="/statistics"
              element={
                <Statistics />
              }
            />
            <Route
              path="/profile"
              element={
                <UserInfoEdit
                  userData={userData}
                  OnUpdateUserData={this.updateUserData}
                />
              }
            />
            <Route
              path="/account"
              element={
                <FinancialTransactionsView
                  userData={userData}
                />
              }
            />
            <Route
              path="/report/:id"
              element={
                <DetailedReport
                  userData={userData}
                />
              }
            />a

            <Route
              path="/publication/:id"
              element={
                <PublicationView
                  userData={userData}
                />
              }
            />
            <Route
              path="/delivery/:id"
              element={
                <DeliveryInfo
                  userData={userData}
                />
              }
            />
            <Route
              path="/confirm/:id"
              element={
                <ConfirmProductDelivery
                  userData={userData}
                />
              }
            />
            <Route
              path="/verify/:token/:userid"
              element={
                <Verify />
              }
            />
            <Route
              path="/not-found"
              element={
                <NotFound />
              }
            />
            <Route
              path="/common-questions"
              element={
                <FrequentlyAskedQuestions />
              }
            />
            <Route
              path="/logout"
              element={
                <Logout OnUpdateUserData={this.updateUserData} />
              }
            />
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
        <OfertAppTeam />
      </div>
    );
  }
}

export default App;
