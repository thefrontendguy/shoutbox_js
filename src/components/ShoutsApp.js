import React from 'react';
import axios from 'axios';

import Shout from './Shout';
import SubmitShout from './SubmitShout';

import bowser from 'bowser';

export default class ShoutsApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouts: [],
            maxShouts: 5, // if more shouts, remove
            ip: null,
            agent: ''
        };
    }
    componentDidMount() {
        this.getShouts();
        this.getIp();
        this.getUserAgent();
    }
    componentDidUpdate(prevProps, prevState) {
        // (not the best way to) auto refresgh  the content
        setTimeout(this.getShouts, 200);
    }
    getShouts = () => {
        axios.get('http://localhost:8000/read')
            .then(res => {
                // if you want to display in reverse order,
                //put .reverse() after Array.from.(res.data)
                const shouts = Array.from(res.data);
                this.setState({ shouts });
                this.findLastShoutToDelete();
            })
            .catch(err => console.error(err));
    }
    findLastShoutToDelete = () => {
        const shouts = this.state.shouts;
        const maxShouts = this.state.maxShouts;
        let len = shouts.length;
        if (len > maxShouts) {
            let id = shouts[0]._id;
            this.removeShout(id);
        }
    }
    createShout = (text) => {
        axios.post('http://localhost:8000/create', {
            'shout_text': text,
            'user_agent': this.state.agent,
            'user_ip': this.state.ip
        })
            .then(res => {
                this.findLastShoutToDelete();
                this.getShouts();
            })
            .catch(err => console.error(err));
    }
    removeShout = (id) => {
        axios.delete(`http://localhost:8000/${id}`)
            .then(res => {
            })
            .catch(err => console.error(err));
    }
    new_timestamp = (timestamp) => {
        let date = new Date(timestamp);
        let currDate = new Date();
        let diffMins = currDate.getMinutes() - date.getMinutes();
        let diffHours = currDate.getHours() - date.getHours();

        // time since the last shout(s)
        if (diffMins < 60 && diffHours < 1) {
            return (diffMins + ' Minutes ago');
        }
        else if (diffMins > 59 && diffHours > 0) {
            return (diffHours + ' hours ago');
        }
    }
    getIp = () => {
        // I would not use this approach in production. we never know, how long this website will be available
        axios.get('https://geoip-db.com/json/geoip.php')
            .then(res => {
                this.setState({ ip: res.data.IPv4 });
            })
            .catch(err => {
                console.error(err)
            })
    }
    getUserAgent = () => {
        const agent = bowser.name + ' ' + bowser.version;
        this.setState({ agent: agent });
    }
    render() {
        const shouts = this.state.shouts;
        return (
            <div className='container' >
                {this.state.reloads}
                <div className='header'>
                    SHOUTBOX
                </div>
                {shouts.map(eachShout => {
                    let timestamp = eachShout.timestamp;
                    let new_timestamp = this.new_timestamp(timestamp);

                    return <Shout
                        key={eachShout._id}
                        new_time={new_timestamp}
                        user_ip={eachShout.user_ip}
                        shout_text={eachShout.shout_text}
                        user_agent={eachShout.user_agent}
                    />
                })}
                <SubmitShout
                    create_shout={this.createShout}
                />
            </div >
        )
    }
}