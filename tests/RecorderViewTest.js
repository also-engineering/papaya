var ns = {
  RecorderView : require("RecorderView"),
  recorderStub : {
    record: function() {console.log("record"); },
    stopRecord: function() {console.log("stopRecord"); },
    play: function() {console.log("play"); },
    stopPlay: function() {console.log("stopPlay"); }
  }
};


describe("RecorderView", function() {

  it("Instantiates a view", function() {
    var v = new ns.RecorderView();
    expect(v).to.not.equal(null);
  });

  describe("rendering", function() {


    it("Shows a play button", function() {
      var v = new ns.RecorderView();
      v.render();
      expect(v.$el.find(".RecorderView-play").length).to.equal(1);

    });

    it("Shows a stop-play button", function() {
      var v = new ns.RecorderView();
      v.render();
      expect(v.$el.find(".RecorderView-stop-play").length).to.equal(1);

    });

    it("Shows a record button", function() {
      var v = new ns.RecorderView();
      v.render();
      expect(v.$el.find(".RecorderView-record").length).to.equal(1);

    });

    it("Shows a stop-record button", function() {
      var v = new ns.RecorderView();
      v.render();
      expect(v.$el.find(".RecorderView-stop-record").length).to.equal(1);
    });

  });

  describe("ui, initial state", function() {
    it("record should be enabled", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var button = v.$el.find(".RecorderView-record");
      expect(button.prop("disabled")).to.be.equal(false);
    });

    it("play should be disabled", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var button = v.$el.find(".RecorderView-play");
      expect(button.prop("disabled")).to.be.equal(true);
    });

    it("play stop should be disabled", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var button = v.$el.find(".RecorderView-stop-play");
      expect(button.prop("disabled")).to.be.equal(true);
    });

    it("record stop should be disabled", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var recordStopButton = v.$el.find(".RecorderView-stop-record");
      expect(recordStopButton.prop("disabled")).to.be.equal(true);
    });

  });


  describe("ui", function() {

    it("should disable record when pressed", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var button = v.$el.find(".RecorderView-record");
      button.trigger("touchstart");
      expect(button.prop("disabled")).to.be.equal(true);
    });

    it("record stop should enable after record pressed", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var recordButton = v.$el.find(".RecorderView-record");
      var recordStopButton = v.$el.find(".RecorderView-stop-record");
      recordButton.trigger("touchstart");
      expect(recordStopButton.prop("disabled")).to.be.equal(false);
    });

    it("should enable play after record started and stopped", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var playButton = v.$el.find(".RecorderView-play");
      var recordButton = v.$el.find(".RecorderView-record");
      var recordStopButton = v.$el.find(".RecorderView-stop-record");
      recordButton.trigger("touchstart");
      recordStopButton.trigger("touchstart");
      expect(playButton.prop("disabled")).to.be.equal(false);
    });


    it("play stop should enable after record, record stop, play", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var playButton = v.$el.find(".RecorderView-play");
      var playStopButton = v.$el.find(".RecorderView-stop-play");
      var recordButton = v.$el.find(".RecorderView-record");
      var recordStopButton = v.$el.find(".RecorderView-stop-record");
      recordButton.trigger("touchstart");
      recordStopButton.trigger("touchstart");
      playButton.trigger("touchstart");
      expect(playStopButton.prop("disabled")).to.be.equal(false);
    });


    it("play should enable after record, record stop, play, play stop", function() {
      var v = new ns.RecorderView();
      v.recorder = ns.recorderStub;
      v.render();
      var playButton = v.$el.find(".RecorderView-play");
      var playStopButton = v.$el.find(".RecorderView-stop-play");
      var recordButton = v.$el.find(".RecorderView-record");
      var recordStopButton = v.$el.find(".RecorderView-stop-record");
      recordButton.trigger("touchstart");
      recordStopButton.trigger("touchstart");
      playButton.trigger("touchstart");
      playStopButton.trigger("touchstart");
      expect(playButton.prop("disabled")).to.be.equal(false);
    });


  });


  describe("recorder interactions", function(){

    it("should have a recorder object", function() {
      var v = new ns.RecorderView();
      expect(v.recorder).to.not.equal(null);

    });

    it("should call record when record pressed", function(done) {
      var v = new ns.RecorderView();
      v.render();
      v.recorder = {
        record: function() { done(); }
      };
      v.$el.find(".RecorderView-record").trigger("touchstart");
    });



  })

})