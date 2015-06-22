<div ng-controller="survey">
    <form>
         <div ng-repeat="(key,question) in data = question_list" ng-show="$index==current_pos">
            <div class="row">
                <div class="large-12">
                    <div class="title-area">
                        <h1 class="text-center">{{question.title}}</h1>
                    </div>
                </div>
            </div>
            <div ng-switch="question.input_type">
                <div ng-switch-when="radio" class="row" ng-repeat="option in question.option_list">
                        <input ng-model="question.result" name="{{key}}" id="option-{{key}}-{{$index}}" value="{{option.value}}" type="radio" checked ng-if="$index==0"/>
                        <input ng-model="question.result" name="{{key}}" id="option-{{key}}-{{$index}}" value="{{option.value}}" type="radio" ng-if="$index!=0"/>
                        <label for="option-{{key}}-{{$index}}">{{option.text}}</label>
                </div>
                <div ng-switch-when="checkbox" class="row" ng-repeat="option in question.option_list">
                        <input ng-model="question.result[option.value]" name="{{key}}[]" id="option-{{key}}-{{$index}}" value="{{option.value}}" type="checkbox"/>
                        <label for="option-{{key}}-{{$index}}">{{option.text}}</label>
                        
                </div>
                <div ng-switch-when="number" class="row">
                        <input ng-model="question.result" name="{{key}}" id="option-{{key}}" type="number" placeholder="{{question.placeholder}}"/>
                        <label for="option-{{key}}">{{option.text}}</label>
                </div>
                 <div ng-switch-when="text" class="row">
                        <input ng-model="question.result" name="{{key}}" id="option-{{key}}" type="text" placeholder="{{question.placeholder}}"/>
                        <label for="option-{{key}}">{{option.text}}</label>
                </div>
            </div>
            <div class="row">
                <button ng-if="$index!=0" ng-click="back_question()">Back</button>
                <button ng-if="$index<max_pos" ng-click="next_question()">Next</button>  
            </div>
        </div> 
    </form>
    {{question_list}}
  
</div>

