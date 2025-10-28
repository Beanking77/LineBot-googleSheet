function doGet(e) {
  Logger.log(e);
}

function doPost(e) {
  try {
    var msg = JSON.parse(e.postData.contents);
    var events = msg.events[0];
    if (events) {
      var replyToken = events.replyToken;
      var userMessage = events.message.text;
      var userId = events.source.userId;
      try {
        var m = events.message.mention.mentionees;
        if (m != null) {
          m.forEach(function (mention, index) {
            if (mention.isSelf) {
              var summary = getSheet(userMessage);
              if (summary != "") {
                response(replyToken, "Summary:\n" + summary);
              }
            }
          });
        }
      } catch (error) {
        if (
          error instanceof TypeError &&
          error.message.includes(
            "Cannot read properties of undefined (reading 'mentionees')"
          )
        ) {
          Logger.log(
            "Error: Could not read 'mentionees'. Ensure 'message' and 'message.mentions' are defined.",
            error
          );
        } else {
          throw error;
        }
      }
    }
  } catch (except) {
    Logger.log(except);
  }
  return;
}

function getSheet(searchName) {
  var sheetID = "YOURSHEETID";
  var sheetName = "YOURSHEETNAME";
  var spreadSheet = SpreadsheetApp.openById(sheetID);
  var sheetInstance = spreadSheet.getSheetByName(sheetName);
  var SHTvalues = sheetInstance.createTextFinder(searchName).findAll();
  var result = SHTvalues.map((r) => ({ row: r.getRow(), col: r.getColumn() }));
  var total = sheetInstance
    .getRange(result[0]["row"], result[0]["col"])
    .getValue();
  return total;
}

function updateSheet(data) {
  var sheetID = "YOURSHEETID";
  var sheetName = "YOURSHEETNAME";
  var spreadSheet = SpreadsheetApp.openById(sheetID);
  var sheetInstance = spreadSheet.getSheetByName(sheetName);
  sheetInstance.appendRow(data);
}

function response(replyToken, msg) {
  var lineToken = ""; // REPLACE TO YOUR OWN LINE BOT TOKEN
  var payload = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: msgF,
      },
    ],
  };
  var option = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + lineToken,
    },
    method: "post",
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", option);
}
