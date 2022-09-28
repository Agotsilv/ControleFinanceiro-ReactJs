import React, { Component } from "react";

import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import { bindActionCreators } from "redux";

import { getSummary } from "./dashboardActions";

import ValueBox from "../common/widget/valueBox";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getSummary();
  }

  render() {
    const { credit, debt } = this.props.summary;
    return (
      <div>
        <ContentHeader title="Dashboard" small="Versão 0.1" />
        <Content>
          <ValueBox
            cols="12 4"
            color="green"
            icon="bank"
            value={credit.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            text="Sálario"
          />
          <ValueBox
            cols="12 4"
            color="red"
            icon="credit-card"
            value={debt.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            text="Contas"
          />
          <ValueBox
            cols="12 4"
            color="blue"
            icon="money"
            value={`R$ ${(credit - debt).toLocaleString()}`}
            text="Valor Restante"
          />
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ summary: state.dashboard.summary });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getSummary }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
