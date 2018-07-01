'GetLocationIntent': function () {

    // delegate to Alexa to collect all the required slots
    let filledSlots = delegateSlotCollection.call(this, function(event) {
        let result = false;
        let slots = event.request.intent.slots;

        if(slots.zip.value || slots.city.value && slots.state.value) {
            result = true;
        }
        return result;
    });

    // delegateSlotCollection may make an asynchronous call, so there
    // is a chance that filledSlots is null. If it's null we need to
    // stop GetLocationIntent and on the next runtime tick,
    // this.emit(':delegate') which was called from
    // delegateSlotCollection will execute.
    if (!filledSlots) {
        return;
    }

    // at this point, we know that all required slots are filled.
    let slotValues = getSlotValues(filledSlots);

    console.log(JSON.stringify(slotValues));

    let speechOutput = "";
    if (slotValues.zip.resolved) {
        speechOutput = `Your zip code is <say-as interpret-as="digits">${slotValues.zip.resolved}</say-as>.`;
    } else {
        speechOutput = `Your shipping address is ${slotValues.city.resolved}, ${slotValues.state.resolved}`;
    }

    this.response.speak(speechOutput);
    this.emit(':responseReady');
}
