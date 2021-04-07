import React, { Component } from 'react'
import Die from './Die'
import './Die.css';
class RollDice extends Component{

    static defaultProps = {
        sides : ["one","two","three","four","five","six"],
        rolls : []
    }

    constructor(props){
        super(props);
        this.state = {die1 : "one" , die2: "one", rolling : false, hasResults : false}
        this.roll = this.roll.bind(this);
        this.clearResults = this.clearResults.bind(this);
    }

    roll(){
        const newDie1 = this.props.sides[Math.floor(Math.random() * this.props.sides.length)]
        const newDie2 = this.props.sides[Math.floor(Math.random() * this.props.sides.length)]
        this.props.rolls.push([newDie1, newDie2]);
        this.setState({die1: newDie1, die2: newDie2, rolling: true, hasResults: true});
        setTimeout(() => {
            this.setState({rolling: false});
        },400);
    }

    clearResults(){
        this.props.rolls.splice(0, this.props.rolls.length);
        this.setState({hasResults : false});
    }


    render(){
        return(
            <div>
                <Die face={this.state.die1}></Die>
                <Die face={this.state.die2}></Die>
                <button onClick={this.roll} disabled={this.state.rolling}>
                    {this.state.rolling ? "Rolling..." : "Roll Dice"}
                </button>
                <button onClick={this.clearResults} disabled={!this.state.hasResults}>
                    Clear Results
                </button>
                <div hidden={!this.state.hasResults}>
                    <h3>Roll Results</h3>
                    <table>
                    <tr>
                        <th>Dice One</th>
                        <th>Dice Two</th>
                    </tr>
                    {this.props.rolls.map(( rollArray ) => {
                        return (
                            <tr>
                            <td>{rollArray[0]}</td>
                            <td>{rollArray[1]}</td>
                            </tr>
                        );
                        })}
                    </table>
                </div>
            </div>
        )
    }
}


export default RollDice;