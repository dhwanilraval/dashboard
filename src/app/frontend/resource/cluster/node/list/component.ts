// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, OnInit} from '@angular/core';
import {StateService} from '@uirouter/core';

import {ResourceStateParams} from '../../../../common/params/params';
import {NodeService} from '../../../../common/services/resource/node';
import {nodeDetailState} from '../detail/state';

@Component({
  selector: 'kd-node-list',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class NodeListComponent implements OnInit {
  node: NodeList;

  constructor(private state_: StateService, private node_: NodeService) {}

  ngOnInit() {
    this.node_.getNodeList().subscribe((res) => {
      this.node = res;
    });
  }

  getDetailsHref(name: string) {
    return this.state_.href(nodeDetailState.name, new ResourceStateParams(name));
  }
}
