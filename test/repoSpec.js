var Repo = require("../lib/repo");
var expect = require("chai").expect;
var settings = require("../settings");

describe("Repo", function() {
  describe("repo", function() {
    it("should have corrent settings", function(){
      var repo = new Repo(settings);
      
      expect(repo).to.have.a.property("repo",settings.repo);
      expect(repo).to.have.a.property("worktree", settings.worktree);
      expect(repo).to.have.a.property("gitdir", settings.gitdir);
      expect(repo).to.have.a.property("remoteBranch", settings.remoteBranch);
    });
    describe("#clone", function(){
      before(function() {
        (!fs.existsSync(".test_files"))
      })
    }
  });
});