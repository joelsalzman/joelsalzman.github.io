var fieldDict = {
    "rawUtility": {
      name:    "Overall Relative Voting Power",
      title:   "Overall Relative<br>Voting Power",
      scheme:  "black-ryg",
      range:   [0, 1],
      labels:  ["0.4 (Blowouts)", "1 (Ties)"],
      display: function(val) { return String(val).slice(0, 6); }
    },
    "decUtility": {
      name:    "Overall Election Competitiveness",
      title:   "Overall Election<br>Competitiveness",
      scheme:  "black-ryg",
      range:   [0, 1],
      labels:  ["0.0 (Safe)", "0.9293 (Swing)"],
      display: function(val) { return String(val).slice(0, 6); }
    },
    "h_rawMargin_avg": {
      name:    "House Average Raw Margin",
      title:   "House Average<br>Raw Margin",
      scheme:  "purpscale",
      range:   [17193, 192181],
      labels:  ["17,193 Votes", "192,181 Votes"],
      display: function(val) { return parseInt(val); }
    },
    "s_rawMargin_avg": {
      name:    "Senate Average Raw Margin",
      title:   "Senate Average<br>Raw Margin",
      scheme:  "purpscale",
      range:   [38699, 2064244],
      labels:  ["38,699 Votes", "2,064,224 Votes"],
      display: function(val) { return parseInt(val); }
    },
    "p_rawMargin_avg": {
      name:    "Presidential Average Raw Margin",
      title:   "Presidential<br>Average Raw Margin",
      scheme:  "purpscale",
      range:   [25431, 2615286],
      labels:  ["25,431 Votes", "2,615,286 Votes"],
      display: function(val) { return parseInt(val); }
    },
    "h_decMargin_avg": {
      name:    "House Proportional Average Margin",
      title:   "House Proportional<br>Average Margin",
      scheme:  "purpscale",
      range:   [0, 1],
      labels:  ["0% (Ties)", "100% (Blowouts)"],
      display: function(val) { return String(val * 100).slice(0, 7) + "%"; }
    },
    "s_decMargin_avg": {
      name:    "Senate Proportional Average Margin",
      title:   "Senate Proportional<br>Average Margin",
      scheme:  "purpscale",
      range:   [0, 1],
      labels:  ["0% (Ties)", "100% (Blowouts)"],
      display: function(val) { return String(val * 100).slice(0, 7) + "%"; }
    },
    "p_decMargin_avg": {
      nname:   "Presidential Proportional Average Margin",
      title:   "Presidential Proportional<br>Average Margin",
      scheme:  "purpscale",
      range:   [0, 1],
      labels:  ["0% (Ties)", "100% (Blowouts)"],
      display: function(val) { return String(val * 100).slice(0, 7) + "%"; }
    },
    "changes": {
      name:    "Number of Times Redistricted",
      title:   "Number of Times<br>Redistricted",
      scheme:  "purpscale",
      range:   [0, 5],
      labels:  ["0", "5"],
      display: function(val) { return val; }
    },
    "changeDesc": {
      display: function(val) { return val; }
    }
};