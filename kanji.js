
function JLPTStudy ()
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
        var i, els = {};
        for (i = 1; i <= 5; i++)
          els[i] = document.getElementById ('lvl'+i);
        return els;
      }
    ) ();
      

  /* state */

  self.items = null;
  self.history = null;
  self.current = null;

  self.nextAction = function () { alert ("Error!"); };

  /* operations */

  self.updateList = function ()
    {
      var str = "";
      for (i in self.checkboxes)
      {
        if (self.checkboxes[i].checked)
          str += window.Kanji[self.checkboxes[i].value];
      }
      
      self.items = str.split('');
      self.history = Array();

      self.nextItem ();
    };

  self.nextItem = function ()
    {
      if (self.items.length == 0) {
        self.display.setText('끝');
        self.dictionary.hide ();
        self.nextAction = function () {};
        return;
      }

      /* choose one */
      var i = Math.floor (Math.random () * self.items.length);
      self.current = self.items[i];

      /* append to history & remove it from list */
      self.history.push (self.current);
      self.items.splice (i,1);

      /* show it & load dictionary */
      txt = self.current;
      self.display.setText (txt);
      self.dictionary.lookup (txt);

      self.nextAction = self.showAnswer;

      self.dictionary.hide ();
    };

  self.showAnswer = function ()
    {
      self.dictionary.show ();
      self.nextAction = self.nextItem;
    };

  self.init = function ()
    {
      self.display.setText ("단계를 선택하세요");
      self.dictionary.hide ();
    };

  return self;
}

