import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {CodePipeline,CodePipelineSource,ShellStep} from 'aws-cdk-lib/pipelines';

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

 //AWS CICD Pipeline 
 const democicdpipeline = new CodePipeline(this,'demopipeline',{
  synth: new ShellStep('Synth', {
    input: CodePipelineSource.gitHub('richagroverr/democicdpipeline', 'main',{
    authentication:cdk.SecretValue.secretsManager(' "github-token", { jsonField: "key" }')}),
    commands: [
      'npm ci',
      'npm run build',
      'npx cdk synth',
    ],
  }),
 }) 
}
}
