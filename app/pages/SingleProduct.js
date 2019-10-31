import React, { Component } from 'react';
import {  
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
  Container,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Footer,
  Header,
  Item,
  Thumbnail,
  Card,
  CardItem,
  Badge,
  Toast,
  H1,
  H2,
  H3
} from "native-base";

import { connect } from 'react-redux';

import themes from '../styles/theme.style';

import Logo from '../components/Logo.component';
import Cart from '../components/Cart.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../redux/actions/productAction';
const HEADER_HEIGHT = 60
const MAX_SCROLL_OFFSET = 400

class SingleProduct extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Single Product',
      headerLeft: <Logo navigation={navigation}/>,
      headerRight: <Cart navigation={navigation}/>
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      product: ''
    }
  }

  componentWillMount = () => {
    this.props.fetchProducts();
    const id = this.props.navigation.getParam('id', {});

    for(let i = 0; i < this.props.products.length; i++) {
      if ( id == this.props.products[i].id) {
        this.setState({
          product: this.props.products[i]
        }) 
      }
    }
  }

  addItemsToCart = () => {
      this.props.addToCart(this.state.product);
  }

  buy = () => {
	this.props.addToCart(this.state.product);
	this.props.navigation.navigate("Checkout")
 }

  getProduct = () => {
    alert(this.state.product.picture)
  }

  render() {
    const { products, navigation } = this.props
    const { product } = this.state
    return (
	  <Container>
	  {/* <TouchableOpacity onPress={this.getProduct}>
		  <View><Text>CEK</Text></View>
      </TouchableOpacity> */}
        <Content>
          <Card>
            <CardItem cardBody>
              <Image source={product.picture} style={{flex: 1}}/>
            </CardItem>
            <CardItem>
				<CardItem>
				<Left>
					<Body>
						<View style={styles.boxShadow}>
							<View>
							<H1>{product.title}</H1>
							</View>
							<View>
							<H3>$ {product.cost.toFixed(2)}</H3>
							</View>

							<View>
							<Text style={{ fontSize: 11, color: 'gray' }}>Kota Shop Product</Text>
							</View>
							<View
							style={styles.horizontalLine}
							/>
							<View>
							<Text style={{ fontSize: 11, fontWeight: "800", color: 'black' }}>Limited Stock! <Text style={{ fontSize: 11, }}>Available >50</Text></Text>
							</View>
							<View style={styles.wrapper}>
							<View style={styles.wrapInfo}>
								<Text style={styles.text1}>Viewed</Text>
								<Text style={styles.text2}>66,27K</Text>
							</View>
							<View style={styles.wrapInfo}>
								<Text style={styles.text1}>Success Transaction</Text>
								<Text style={styles.text2}>99,33%</Text>
							</View>
							<View style={styles.wrapInfo}>
								<Text style={styles.text1}>Wishlisht</Text>
								<Text style={styles.text2}>1193</Text>
							</View>
							</View>
						</View>
					</Body>
				</Left>
				</CardItem>
            </CardItem>
			<CardItem>
			<View style={[styles.boxShadow]}>
				<View>
					<Text style={styles.title}>Product Detail :</Text>
					<View style={styles.infoList}>
						<Text style={styles.description}>Author: {product.author}</Text>
					</View>
					<View style={styles.infoList}>
						<Text style={styles.description}>Author Bio: {product.authorbio}</Text>
					</View>
					<View style={styles.infoList}>
						<Text style={styles.description}>Release Date: {product.publicationdate}</Text>
					</View>	
				</View>
			</View>
			</CardItem>
			<CardItem>
				<Body>		
					<Left>
						<View>
							<Text style={styles.title}>Product Description :</Text>
							<Text style={styles.description}>{product.introduction}</Text>
						</View>
					</Left>
				</Body>
			</CardItem>
			<CardItem>
				<Body>
					<Footer>
						<View style={styles.footer}>
						<Button
							style={styles.buttonBuy} bordered
							onPress={this.buy}
						>
							<Text style={{ color: themes.BUTTON_COLOR, fontSize: 12 }} uppercase={false}>Buy</Text>
						</Button>
						<Button
							style={styles.buttonCart}
							onPress={this.addItemsToCart}
						>
							<Text style={{ fontSize: 12, color: 'white' }} uppercase={false}>Add to cart</Text>
						</Button>
						</View>
					</Footer>
				</Body>
			</CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	boxShadow: {
		borderColor: 'rgba(0, 0, 0, 0.1)',
		borderBottomWidth: 10,
		padding: 15,
	},
	horizontalLine: {
		borderBottomColor: 'lightgray',
		borderBottomWidth: 1,
		marginBottom: 7,
		marginTop: 7
	},
	wrapper: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#F6F6F6',
		padding: 10,
		borderRadius: 5
	},
	text1: {
		fontSize: 12,
		color: 'gray',
		textAlign: 'center',
		marginBottom: 5
	},
	text2: {
		fontSize: 12,
		color: 'gray',
		fontWeight: "600",
		textAlign: 'center'
	},
	description: {
		fontSize: 15,
		color: '#747474'
	},
	title: {
		fontSize: 16,
		color: '#747474',
		fontWeight: '600',
		marginBottom: 10
	},
	infoList: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 5
	},
	footer: {
		paddingTop: 5,
		paddingRight: 15,
		paddingLeft: 15,
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
	},
	buttonBuy: {
		borderColor: themes.BUTTON_COLOR,
		borderWidth: 3,
		borderRadius: 5,
		width: 120,
		justifyContent: 'center',
		borderRadius: 30,
	},
	buttonCart: {
		backgroundColor: themes.BUTTON_COLOR,
		borderRadius: 30,
		color: 'white',
		width: 120,
		justifyContent: 'center'
	},
});

const mapStateToProps = (state) => ({
  products: state.products.items
})

export default connect(mapStateToProps, {addToCart,fetchProducts})(SingleProduct);
