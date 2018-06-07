import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'


class JournalEntryForm extends Component {

    componentDidMount(){
        window.initMaterialize()
    }

    render() {
        return (
            <div onClick={(e) => { this.props.handleJournalEntryDateChange(e) }}>
                <div className="row">
                    <form className="col s12" onSubmit={(e) => { this.props.handleJournalSubmit(e) }}>
                        <div className="row">
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={moment(this.props.date).format("MMM YYYY")} type="text" id="date" className="datepicker" />
                                <label htmlFor="date" className="active">Date</label>
                            </div>
                        </div>
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <textarea id="textarea1" value={this.props.entry} onChange={(e) => { this.props.handleJournalEntryChange(e) }} class="materialize-textarea"></textarea>
                                        <label for="textarea1">Textarea</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button className="waves-effect waves-light btn-large" type="submit" value="Submit">Save</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default JournalEntryForm;
