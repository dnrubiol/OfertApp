import { Component } from 'react';
import withRouter from "../../services/withRouter";
import { getStatistics } from '../../services/statisticsService';
import StatisticsAccountView from './statisticsViewBalance';
import BarPlot from './barPlot';
import PiePlot from './pieChart';
import LinePlot from './histogram';
import ComboBox from '../common/comboBox';
import CustomButton from '../common/Button/button';
import generateRandomColor from "../../utils/randomColor";
import { getDatetimeFormatted } from "../../utils/getTime";
import "./statistics.css";

class Statistics extends Component {

    state = {
        data : {
            balance: 0,
            frozenBalance: 0,
            salesAndPurchases: [],
            reactions: [],
            offers: [],

            // Histogram options
            financialGroupingBy: "day",
            financialviewBy: "money",

            // Piechart options
            reactionsGroupingBy: "lday",

            // Barchart options
            offersViewBy: "money",
            offersLast: "5"
        },

        // Histogram data
        histogramData : {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            salesData : [1,2,3,4,5,6,7],
            purchasesData : [1,2,3,4,5,6,7]
        },

        // Piechart data
        piechartData : {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            reactionsData : [1,2,3,4,5,6,7],
        },

        // Barchart data
        barPlotData : {
            labels: ['.', '.', '.', '.', '.', '.', '.'],
            offersData : [1,2,3,4,5,6,7],
        }
    }

    // Trigger for combobox selection change
    handleComboBoxChange = (id, value) => {

        // Update state
        let currentData = this.state.data;

        if( id === "financialGroupingBy" ){
            currentData.financialGroupingBy = value;
        } else if( id === "financialviewBy" ){
            currentData.financialviewBy = value;
        } else if( id === "reactionsGroupingBy" ){
            currentData.reactionsGroupingBy = value;
        } else if( id === "offersViewBy" ){
            currentData.offersViewBy = value;
        } else if( id === "offersLast" ){
            currentData.offersLast = value;
        }

        // Update state's data
        this.setState({ data: currentData });
    }

    async componentDidMount() {
        await this.updateState();
    }

    // Update histogram data (finantial data)
    updateState = async () => {
        try{
            // Getting user's token
            const token = localStorage.getItem("token");

            // Configuring parameters in order to let backend do the work
            const params = {
                groupFinancialBy: this.state.data.financialGroupingBy,
                viewFinancialBy: this.state.data.financialviewBy,
                viewReactionsBy: this.state.data.reactionsGroupingBy,
                viewOffersBy: this.state.data.offersViewBy,
                viewLastOffersIn: this.state.data.offersLast
            }
            const responseData = await getStatistics( token, params );
            const { data, status } = responseData.data;
            if( status === "success" ){

                // Update charts data
                this.updateChartsData({
                    ...this.state.data,
                    balance: data.balance,
                    frozenBalance: data.frozenBalance,                        
                    salesAndPurchases: data.salesPurchases,
                    reactions: data.reactions,
                    offers: data.offers
                });
                return;

            } else {
                console.log("Error: ", data);
                this.props.navigate("/login");
            }
        } catch( e ){
            console.log("Error: ", e);
            this.props.navigate("/login");
        }
    }

    // Separate function for updating charts data
    updateChartsData = ( data ) => {

        const { salesAndPurchases, reactions, offers } = data;
        const { financialGroupingBy } = data;

        const financialLabels = salesAndPurchases.map( 
            (record) => getDatetimeFormatted(record[financialGroupingBy])
        );
        
        const salesData = salesAndPurchases.map( (record) => record.sales );
        const purchasesData = salesAndPurchases.map( (record) => record.purchases );

        const reactionsLabels = reactions.map( (reaction) => reaction.type );
        const reactionsData = reactions.map( (reaction) => reaction.total );

        const offersLabels = offers.map( (offer) => offer.publicationTitle );
        
        const offersData = offers.map( (offer) => offer.total );

        const { histogramData, piechartData, barPlotData } = this.state;
        histogramData.labels = financialLabels;
        histogramData.salesData = salesData;
        histogramData.purchasesData = purchasesData;

        piechartData.labels = reactionsLabels;
        piechartData.reactionsData = reactionsData;

        barPlotData.labels = offersLabels;
        barPlotData.offersData = offersData;
        
        // Update current data and charts data
        this.setState({
            data : data,
            histogramData: histogramData,
            piechartData: piechartData,
            barPlotData: barPlotData
        });
    }

    // Utils for data generation
    generateHistogramData = () => {
        const { histogramData } = this.state;
        return {
            labels: histogramData.labels,
            datasets: [
                {
                    label: 'Ventas',
                    data: histogramData.salesData,
                    borderColor: generateRandomColor(),
                    backgroundColor: generateRandomColor(),
                },
                {
                    label: 'Compras',
                    data: histogramData.purchasesData,
                    borderColor: generateRandomColor(),
                    backgroundColor: generateRandomColor(),
                },
            ],
        }
    }

    generatePiechartData = () => {
        const { piechartData } = this.state;
        return {
            labels: piechartData.labels,
            datasets: [
                {
                    label: '# of Votes',
                    data: piechartData.reactionsData,
                    backgroundColor: piechartData.labels.map( () => generateRandomColor() ),
                    borderColor: generateRandomColor(),
                    borderWidth: 1,
                },
            ]
        }
    }

    generateBarPlotData = () => {
        const { barPlotData } = this.state;
        return {
            labels: barPlotData.labels,
            datasets: [
                {
                    label: 'Publicaciones',
                    data: barPlotData.offersData,
                    backgroundColor: generateRandomColor(),
                },
            ],
        }
    }

    render() {

        // Update charts data
        return (
            <div className="w-100 text-center">
                <h1 className = "ofertapp-page-title">
                    Mi progreso
                </h1>
                <h2 className='ofertapp-statistics-subtitle'>
                    Tu balance
                </h2>
                <StatisticsAccountView
                    balance = {this.state.data.balance}
                    frozenBalance = {this.state.data.frozenBalance}
                />
                <h2 className='ofertapp-statistics-subtitle'>
                    Tus ventas y compras
                </h2>
                <div className='row ofertapp-bottomline justify-content-center'>
                    <div className='col-12 col-sm-3 text-center'>
                        <ComboBox
                            label = "Agrupar por"
                            options = {[
                                { name: "day", label: "Día" },
                                { name: "week", label: "Semana" },
                                { name: "month", label: "Mes" },
                                { name: "year", label: "Año" }
                            ]}
                            value = "day"
                            onChange = {(value) => {this.handleComboBoxChange("financialGroupingBy", value)}}
                            info = "OPCIONAL: Agrupa tus ventas y compras por día, semana, mes o año."
                        />
                        <br />
                        <ComboBox
                            label = "Ver:"
                            options = {[
                                { name: "money", label: "Monto" },
                                { name: "quantity", label: "Cantidad" },
                            ]}
                            value = "money"
                            onChange={(value) => {this.handleComboBoxChange("financialviewBy", value)}}
                            info = "OPCIONAL: Ver tus ventas y compras por monto o cantidad."
                        />
                    </div>
                    <div className='col-12 col-sm-9 text-center' style={{"height":"300px"}}>
                        <LinePlot title = "Tu avance financiero" data={this.generateHistogramData()} />
                    </div>
                </div>
                <h2 className='ofertapp-statistics-subtitle'>
                    Reacciones a tus comentarios
                </h2>
                <div className='row ofertapp-bottomline text-center'>
                    <div className='col-12 col-sm-3'>
                        <ComboBox
                            label = "Ver por:"
                            options = {[
                                { name: "lday", label: "Último día" },
                                { name: "lweek", label: "Última Semana" },
                                { name: "lmonth", label: "Último Mes" },
                                { name: "lyear", label: "Último Año" }
                            ]}
                            value = "day"
                            onChange = {(value) => {this.handleComboBoxChange("reactionsGroupingBy", value)}}
                            info = "OPCIONAL: Ver las reacciones a tus comentarios por día, semana, mes o año."
                        />
                    </div>
                    <div className='col-12 col-sm-9 text-center' style={{"height":"300px"}}>
                        <PiePlot title = "Reacciones a tus comentarios" data={this.generatePiechartData()}/>
                    </div>
                </div>
                <h2 className='ofertapp-statistics-subtitle'>
                    Ofertas a tus publicaciones
                </h2>
                <div className='row ofertapp-bottomline text-center'>
                    <div className='col-12 col-sm-3'>
                        <ComboBox
                            label = "Ver por:"
                            options = {[
                                { name: "money", label: "Monto" },
                                { name: "quantity", label: "Cantidad" },
                            ]}
                            value = "money"
                            onChange = {(value) => {this.handleComboBoxChange("offersViewBy", value)}}
                            info = {"OPCIONAL: Ver las ofertas a tus publicaciones por monto o cantidad." +
                                " El monto es el monto máximo ofrecido por alguien a tu oferta."}
                        />
                        <br/>
                        <ComboBox
                            label = "Ultimas:"
                            options = {[
                                { name: "5", label: "5 Publicaciones" },
                                { name: "10", label: "10 Publicaciones" },
                                { name: "20", label: "20 Publicaciones" },
                            ]}
                            value = "money"
                            onChange = {(value) => {this.handleComboBoxChange("offersLast", value)}}
                            info = "OPCIONAL: Ver tus últimas 5, 10 o 20 publicaciones."
                        />
                    </div>
                    <div className='col-12 col-sm-9 text-center' style={{"height":"300px"}}>
                        <BarPlot title = "Ofertas a tus publicaciones" data={this.generateBarPlotData()}/>
                    </div>
                </div>
                <CustomButton 
                    caption="Actualizar" 
                    type="primary"
                    onClick={ () => {this.updateState()} }
                />
            </div>
        );
    };
}

export default withRouter(Statistics);