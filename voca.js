
if(!Array.prototype.last)
{
  Array.prototype.last = function()
    {
      return this[this.length - 1];
    };
}


function JLPTVocaStudy ()
{
  var self = {};

  /* elements */

  self.display =
    {
      element: document.getElementById ('disp'),
      setText: function (txt) { this.element.innerHTML = txt; }
    };

  self.dictionary =
    {
      query  : 'http://jpdic.naver.com/mini_search.nhn?query=',
      element: document.getElementById ('dict'),

      show   : function () { this.element.style.visibility = "visible"; },
      hide   : function () { this.element.style.visibility = "hidden" ; },
      lookup : function (txt) { this.element.src = this.query + txt; }
    };

  self.checkboxes =
    (function ()
      {
        var i;
        var els = {};
        for (i=1; i<=5; i++)
          els[i] = document.getElementById ('lvl'+i);
        return els;
      }
    ) ();
      

  /* state */

  self.words = null;
  self.history = null;
  self.current = null;

  self.nextAction = function () { };

  /* operations */

  self.updateWordList = function ()
    {
      words = [];
      for (i in self.checkboxes)
      {
        if (self.checkboxes[i].checked)
          words = words.concat(window.Voca[i])
      }
      
      self.words = words
      self.history = Array();

      self.nextWord ();
    };

  self.nextWord = function ()
    {
      var i;

      /* hide dictionary */
      self.dictionary.hide ();

      /* choose one */
      i = Math.floor (Math.random () * self.words.length);
      self.current = self.words[i].split ("_");

      /* append to history & remove it from list */
      self.history.push (self.current);
      self.words.splice (i,1);

      /* show it & load dictionary */
      txt = self.current[0];
      if (txt == "") txt = self.current[1];
      self.display.setText (txt);
//      self.dictionary.lookup (txt);

      self.nextAction = self.showAnswer;
    };

  self.showAnswer = function ()
    {
      self.dictionary.lookup (self.display.element.innerHTML);
      if (self.current[0] != "")
      {
        self.display.setText (self.current[0] + 
                              "<p style='font-size:50px'>" +
            self.current[1] + "</p>");
      }
      self.dictionary.show ();

      self.nextAction = self.nextWord;
    };

  self.init = function ()
    {
      self.display.setText ("단계를 선택하세요");
      self.dictionary.hide ();
    };

  return self;
}

