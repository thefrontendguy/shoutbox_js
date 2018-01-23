import React from 'react';
import Linkify from 'react-linkify';

export default class Shout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_time: '',
            shout_text: '',
            user_ip: '',
            user_agent: ''
        }
    }
    componentDidMount() {
        const { new_time, shout_text, user_ip, user_agent } = this.props;
        this.setState({
            new_time, shout_text, user_ip, user_agent
        })
    }
    render() {
        return (
            <div className='shout'>
                <div className='date'>
                    {this.state.new_time}
                </div>
                <div className='text'>
                    <Linkify>
                        {this.state.shout_text}
                    </Linkify>
                </div>
                <div className='user'>
                    <div className='user_ip'>
                        <span>IP: </span>
                        {this.state.user_ip}
                    </div>
                    <div className='user_agent'>
                        <span>User agent: </span>
                        {this.state.user_agent}
                    </div>
                </div>
            </div>
        )
    }
}