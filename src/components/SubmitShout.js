import React from 'react';

export default class SubmitShout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shout_text: ''
        }
    }
    handleChange = (e) => {
        let newVal = e.target.value;
        this.setState({ shout_text: newVal })
    }
    handleSubmit = (text) => {
        this.props.create_shout(text);
        this.setState({ shout_text: '' });
    }
    render() {
        let text = this.state.shout_text;
        return (
            <form>
                <input
                    type='text'
                    placeholder='Write something'
                    value={text}
                    className='input'
                    onChange={e => this.handleChange(e)}
                />
                <input
                    type='button'
                    disabled={!text}
                    value='Shout!'
                    className='btn-send'
                    onClick={() => { this.handleSubmit(text) }}
                />
            </form>
        )
    }
}