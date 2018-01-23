import React from 'react';
import Linkify from 'react-linkify';

export default class Shout extends React.Component {
    render() {
        const { new_time, shout_text, user_ip, user_agent } = this.props;
        return (
            <div className='shout'>
                <div className='date'>
                    {new_time}
                </div>
                <div className='text'>
                    <Linkify>
                        {shout_text}
                    </Linkify>
                </div>
                <div className='user'>
                    <div className='user_ip'>
                        <span>IP: </span>
                        {user_ip}
                    </div>
                    <div className='user_agent'>
                        <span>User agent: </span>
                        {user_agent}
                    </div>
                </div>
            </div>
        )
    }
}