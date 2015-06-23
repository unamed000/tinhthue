<div ng-controller="survey">
    <form ng-if="!show_result">
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
    <div ng-if="show_result">
        <div ng-if="question_list['salary_type']['result']=='gross'">
            <div class="row">
                <h1 class="text-center large-12">{{result['title']}}</h1>
            </div>
            <div class="row">
                <h4 class="text-center">{{result['salary_net'] | currency}}</h4>
            </div>
            <div class="row">
                <h4 class="large-12">Giải trình chi tiết</h4>
                <table>
                    <tr>
                        <th>Giảm trừ gia cảnh và bản thân</th>
                        <td>{{result['dependence'] | currency}}</td>
                    </tr>
                     <tr>
                        <th>Thuế thu nhập cá nhân</th>
                        <td>{{result['income_tax'] | currency}}</td>
                    </tr>
                    <tr>
                        <th>Tổng chi phí đóng bảo hiểm</th>
                        <td>{{result['insurance'] | currency}}</td>
                    </tr>
                    <tr>
                        <td>{{result['social_insurance']['title']}}</td>
                        <td>{{result['social_insurance']['value'] | currency}}</td>
                    </tr>
                    <tr>
                        <td>{{result['health_insurance']['title']}}</td>
                        <td>{{result['health_insurance']['value'] | currency}}</td>
                    </tr>
                    <tr>
                        <td>{{result['unemployment_insurance']['title']}}</td>
                        <td>{{result['unemployment_insurance']['value'] | currency}}</td>
                    </tr>
                </table>
            </div>
            <div class="row">
                <button ng-click="retry()">Tính lại</button> 
            </div>
        </div>
        <div ng-if="question_list['salary_type']['result']=='net'">
            <div class="row">
                <h1 class="text-center large-12">{{result['title']}}</h1>
            </div>
            <div class="row">
                <h4 class="text-center">{{result['salary_gross'] | currency}}</h4>
            </div>
            <div class="row">
                <h4 class="large-12">Giải trình chi tiết</h4>
                <table>
                    <tr>
                        <th>Giảm trừ gia cảnh và bản thân</th>
                        <td>{{result['dependence'] | currency}}</td>
                    </tr>
                     <tr>
                        <th>Thuế thu nhập cá nhân</th>
                        <td>{{result['income_tax'] | currency}}</td>
                    </tr>
                    <tr>
                        <th>Tổng chi phí đóng bảo hiểm</th>
                        <td>{{result['insurance'] | currency}}</td>
                    </tr>
                    <tr>
                        <td>{{result['social_insurance']['title']}}</td>
                        <td>{{result['social_insurance']['value'] | currency}}</td>
                    </tr>
                    <tr>
                        <td>{{result['health_insurance']['title']}}</td>
                        <td>{{result['health_insurance']['value'] | currency}}</td>
                    </tr>
                    <tr>
                        <td>{{result['unemployment_insurance']['title']}}</td>
                        <td>{{result['unemployment_insurance']['value'] | currency}}</td>
                    </tr>
                </table>
            </div>
          <div class="row">
                <button ng-click="retry()">Tính lại</button> 
            </div>
        </div>
    </div>
</div>